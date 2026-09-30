const Complaint = require("../models/Complaint");
const ServiceRequest = require("../models/ServiceRequest");

// Customer creates a complaint
const createComplaint = async (req, res) => {
  try {
    const {
      serviceRequestId,
      subject,
      description,
    } = req.body;

    if (
  !serviceRequestId ||
  !subject ||
  !subject.trim() ||
  !description ||
  !description.trim()
) {
  return res.status(400).json({
    message:
      "Service request, subject and description are required",
  });
}

    // Check the service request
    const serviceRequest = await ServiceRequest.findById(
      serviceRequestId
    );

    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    // Only the customer who created the request can complain
    if (
      serviceRequest.customerId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only create complaints for your own service requests",
      });
    }

    if (
  serviceRequest.status === "pending" ||
  serviceRequest.status === "rejected" ||
  serviceRequest.status === "cancelled"
) {
  return res.status(400).json({
    message:
      "Complaints can only be submitted for accepted, in-progress or completed services",
  });
}
    // Prevent multiple pending complaints for the same request
    const existingComplaint = await Complaint.findOne({
      serviceRequestId,
      status: {
        $in: ["pending", "under_review"],
      },
    });

    if (existingComplaint) {
      return res.status(400).json({
        message:
          "There is already an active complaint for this service request",
      });
    }

    const complaint = await Complaint.create({
      customerId: req.user._id,
      providerId: serviceRequest.providerId,
      serviceRequestId,
      subject: subject.trim(),
      description: description.trim(),
    });

    const populatedComplaint = await Complaint.findById(
      complaint._id
    )
      .populate(
        "customerId",
        "fullName username email contactNo"
      )
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate status"
      );

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: populatedComplaint,
    });
  } catch (error) {
    console.error("Create complaint error:", error);

    res.status(500).json({
      message: "Server error while creating complaint",
    });
  }
};


// Customer views their complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      customerId: req.user._id,
    })
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your complaints retrieved successfully",
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("Get my complaints error:", error);

    res.status(500).json({
      message: "Server error while retrieving complaints",
    });
  }
};


// Get a specific complaint
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate(
        "customerId",
        "fullName username email contactNo"
      )
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate status"
      );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Only the customer who created it can view it
    if (
      complaint.customerId._id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You do not have access to this complaint",
      });
    }

    res.status(200).json({
      message: "Complaint retrieved successfully",
      complaint,
    });
  } catch (error) {
    console.error("Get complaint error:", error);

    res.status(500).json({
      message: "Server error while retrieving complaint",
    });
  }
};


// Admin: view all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate(
        "customerId",
        "fullName username email contactNo"
      )
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All complaints retrieved successfully",
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("Get all complaints error:", error);

    res.status(500).json({
      message: "Server error while retrieving complaints",
    });
  }
};


// Admin: update complaint status and response
const updateComplaint = async (req, res) => {
  try {
    const {
      status,
      adminResponse,
    } = req.body;

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    if (status !== undefined) {
      const allowedStatuses = [
        "pending",
        "under_review",
        "resolved",
        "rejected",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid complaint status",
        });
      }

      complaint.status = status;
    }

    if (adminResponse !== undefined) {
  complaint.adminResponse = adminResponse.trim();
}

    const updatedComplaint = await complaint.save();

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Update complaint error:", error);

    res.status(500).json({
      message: "Server error while updating complaint",
    });
  }
};


// Customer: delete their pending complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      customerId: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    if (complaint.status !== "pending") {
      return res.status(400).json({
        message:
          "Only pending complaints can be deleted",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error("Delete complaint error:", error);

    res.status(500).json({
      message: "Server error while deleting complaint",
    });
  }
};


module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
};