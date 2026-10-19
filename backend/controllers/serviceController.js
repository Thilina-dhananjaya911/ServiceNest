const Service = require("../models/Service");
const ServiceCategory = require("../models/ServiceCategory");

// Create a service
const createService = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      description,
      basePrice,
    } = req.body;

    if (!categoryId || !name || !name.trim() || basePrice === undefined) {
  return res.status(400).json({
    message: "Category, service name and base price are required",
  });
}

    if (typeof basePrice !== "number" || basePrice < 0) {
  return res.status(400).json({
    message: "Base price must be a non-negative number",
  });
}
    // Check whether the category exists
    const category = await ServiceCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Service category not found",
      });
    }

    if (!category.isActive) {
      return res.status(400).json({
        message: "Cannot create a service under an inactive category",
      });
    }

    // Check duplicate service name
    const existingService = await Service.findOne({
      name: name.trim(),
      categoryId,
    });

    if (existingService) {
      return res.status(400).json({
        message: "This service already exists in this category",
      });
    }

    const service = await Service.create({
      categoryId,
      name: name.trim(),
      description: description || "",
      basePrice,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      message: "Server error while creating service",
    });
  }
};


// Get all active services
const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    })
      .populate("categoryId", "name description icon basePrice")
      .sort({ name: 1 });

    res.status(200).json({
      message: "Services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      message: "Server error while retrieving services",
    });
  }
};


// Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.find({
      categoryId,
      isActive: true,
    })
      .populate("categoryId", "name description icon basePrice")
      .sort({ name: 1 });

    res.status(200).json({
      message: "Services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services by category error:", error);

    res.status(500).json({
      message: "Server error while retrieving services",
    });
  }
};


// Get all services
// Admin use
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("categoryId", "name description icon basePrice")
      .sort({ name: 1 });

    res.status(200).json({
      message: "All services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get all services error:", error);

    res.status(500).json({
      message: "Server error while retrieving services",
    });
  }
};


// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
  _id: req.params.id,
  isActive: true,
})
  .populate("categoryId", "name description icon basePrice");

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service retrieved successfully",
      service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      message: "Server error while retrieving service",
    });
  }
};


// Update service
const updateService = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      description,
      basePrice,
      isActive,
    } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (categoryId !== undefined) {
      const category = await ServiceCategory.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          message: "Service category not found",
        });
      }

      if (!category.isActive) {
        return res.status(400).json({
          message: "Cannot assign service to an inactive category",
        });
      }

      service.categoryId = categoryId;
    }

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Service name cannot be empty",
        });
      }

      const existingService = await Service.findOne({
        name: name.trim(),
        categoryId: service.categoryId,
        _id: { $ne: service._id },
      });

      if (existingService) {
        return res.status(400).json({
          message: "Another service with this name already exists",
        });
      }

      service.name = name.trim();
    }

    if (description !== undefined) {
      service.description = description;
    }

    if (basePrice !== undefined) {
  if (typeof basePrice !== "number" || basePrice < 0) {
    return res.status(400).json({
      message: "Base price must be a non-negative number",
    });
  }

  service.basePrice = basePrice;
}

    if (isActive !== undefined) {
      service.isActive = isActive;
    }

    const updatedService = await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Server error while updating service",
    });
  }
};


// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      message: "Server error while deleting service",
    });
  }
};


module.exports = {
  createService,
  getActiveServices,
  getServicesByCategory,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};