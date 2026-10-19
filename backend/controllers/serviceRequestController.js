const ServiceRequest = require("../models/ServiceRequest");
const Service = require("../models/Service");
const User = require("../models/User");

// Customer creates a service request
const createServiceRequest = async (req, res) => {
  try {
    const {
      providerId,
      serviceId,
      description,
      address,
      requestedDate,
    } = req.body;

    if (
  !providerId ||
  !serviceId ||
  !address ||
  !address.trim() ||
  !requestedDate
) {
  return res.status(400).json({
    message:
      "Provider, service, address and requested date are required",
  });
}

    // Check provider
    const provider = await User.findOne({
  _id: providerId,
  role: "provider",
  isActive: true,
  isVerified: true,
});

    if (!provider) {
      return res.status(404).json({
        message: "Active and verified provider not found",
      });
    }

    if (provider._id.toString() === req.user._id.toString()) {
  return res.status(400).json({
    message: "You cannot create a service request for yourself",
  });
}

    // Check service
    const service = await Service.findOne({
  _id: serviceId,
  isActive: true,
}).populate("categoryId");

    if (!service) {
      return res.status(404).json({
        message: "Active service not found",
      });
    }

    if (!service.categoryId || !service.categoryId.isActive) {
  return res.status(400).json({
    message: "Cannot request a service from an inactive category",
  });
}
    // Prevent selecting a past date
    const requestedDateTime = new Date(requestedDate);

    if (isNaN(requestedDateTime.getTime())) {
      return res.status(400).json({
        message: "Invalid requested date",
      });
    }

    if (requestedDateTime < new Date()) {
      return res.status(400).json({
        message: "Requested date cannot be in the past",
      });
    }

    const serviceRequest = await ServiceRequest.create({
      customerId: req.user._id,
      providerId,
      serviceId,
      description: description || "",
      address: address.trim(),
      requestedDate: requestedDateTime,
      status: "pending",
    });

    const populatedRequest = await ServiceRequest.findById(
      serviceRequest._id
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
        "serviceId",
        "name description basePrice"
      );

    res.status(201).json({
      message: "Service request created successfully",
      request: populatedRequest,
    });
  } catch (error) {
    console.error("Create service request error:", error);

    res.status(500).json({
      message: "Server error while creating service request",
    });
  }
};


// Customer views their requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      customerId: req.user._id,
    })
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceId",
        "name description basePrice"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your service requests retrieved successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get customer requests error:", error);

    res.status(500).json({
      message: "Server error while retrieving service requests",
    });
  }
};


// Provider views requests assigned to them
const getProviderRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      providerId: req.user._id,
    })
      .populate(
        "customerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceId",
        "name description basePrice"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Provider service requests retrieved successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get provider requests error:", error);

    res.status(500).json({
      message: "Server error while retrieving service requests",
    });
  }
};


// Get a single request
const getRequestById = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate(
        "customerId",
        "fullName username email contactNo"
      )
      .populate(
        "providerId",
        "fullName username email contactNo"
      )
      .populate(
        "serviceId",
        "name description basePrice"
      );

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    // Only customer or assigned provider can view it
    const isCustomer =
      request.customerId._id.toString() ===
      req.user._id.toString();

    const isProvider =
      request.providerId._id.toString() ===
      req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        message: "You do not have access to this request",
      });
    }

    res.status(200).json({
      message: "Service request retrieved successfully",
      request,
    });
  } catch (error) {
    console.error("Get request error:", error);

    res.status(500).json({
      message: "Server error while retrieving service request",
    });
  }
};


// Provider accepts a pending request
const acceptRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Only pending requests can be accepted",
      });
    }

    request.status = "accepted";

    // Default to the service base price
    const service = await Service.findById(request.serviceId);

    if (service) {
      request.agreedPrice = service.basePrice;
    }

    await request.save();

    res.status(200).json({
      message: "Service request accepted",
      request,
    });
  } catch (error) {
    console.error("Accept request error:", error);

    res.status(500).json({
      message: "Server error while accepting service request",
    });
  }
};


// Provider rejects a pending request
const rejectRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Only pending requests can be rejected",
      });
    }

    request.status = "rejected";

    await request.save();

    res.status(200).json({
      message: "Service request rejected",
      request,
    });
  } catch (error) {
    console.error("Reject request error:", error);

    res.status(500).json({
      message: "Server error while rejecting service request",
    });
  }
};


// Provider starts the service
const startRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    if (request.status !== "accepted") {
      return res.status(400).json({
        message:
          "Only accepted requests can be started",
      });
    }

    request.status = "in_progress";

    await request.save();

    res.status(200).json({
      message: "Service request is now in progress",
      request,
    });
  } catch (error) {
    console.error("Start request error:", error);

    res.status(500).json({
      message: "Server error while starting service request",
    });
  }
};


// Provider marks the service as completed
const completeRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    if (request.status !== "in_progress") {
      return res.status(400).json({
        message:
          "Only in-progress requests can be completed",
      });
    }

    request.status = "completed";

    await request.save();

    res.status(200).json({
      message: "Service request completed",
      request,
    });
  } catch (error) {
    console.error("Complete request error:", error);

    res.status(500).json({
      message: "Server error while completing service request",
    });
  }
};


// Customer cancels a pending or accepted request
const cancelRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      customerId: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    if (
      request.status !== "pending" &&
      request.status !== "accepted"
    ) {
      return res.status(400).json({
        message:
          "Only pending or accepted requests can be cancelled",
      });
    }

    request.status = "cancelled";

    await request.save();

    res.status(200).json({
      message: "Service request cancelled",
      request,
    });
  } catch (error) {
    console.error("Cancel request error:", error);

    res.status(500).json({
      message: "Server error while cancelling service request",
    });
  }
};


module.exports = {
  createServiceRequest,
  getMyRequests,
  getProviderRequests,
  getRequestById,
  acceptRequest,
  rejectRequest,
  startRequest,
  completeRequest,
  cancelRequest,
};