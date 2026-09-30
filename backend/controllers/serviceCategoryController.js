const ServiceCategory = require("../models/ServiceCategory");

// Create a service category
const createCategory = async (req, res) => {
  try {
    const { name, description, icon, basePrice } = req.body;

    if (!name || !name.trim()) {
  return res.status(400).json({
    message: "Category name is required",
  });
}

    // Check duplicate category
    const existingCategory = await ServiceCategory.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Service category already exists",
      });
    }

    if (
  basePrice !== undefined &&
  (typeof basePrice !== "number" || basePrice < 0)
) {
  return res.status(400).json({
    message: "Base price must be a non-negative number",
  });
}

    const category = await ServiceCategory.create({
  name: name.trim(),
  description: description || "",
  icon: icon || "",
  basePrice:
    basePrice !== undefined ? basePrice : 0,
});

    res.status(201).json({
      message: "Service category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    res.status(500).json({
      message: "Server error while creating service category",
    });
  }
};

// Get all active service categories
const getActiveCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find({
      isActive: true,
    }).sort({ name: 1 });

    res.status(200).json({
      message: "Service categories retrieved successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      message: "Server error while retrieving service categories",
    });
  }
};

// Get all service categories
// Admin use
const getAllCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find().sort({
      name: 1,
    });

    res.status(200).json({
      message: "All service categories retrieved successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get all categories error:", error);

    res.status(500).json({
      message: "Server error while retrieving service categories",
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
   const category = await ServiceCategory.findOne({
  _id: req.params.id,
  isActive: true,
});

    if (!category) {
      return res.status(404).json({
        message: "Service category not found",
      });
    }

    res.status(200).json({
      message: "Service category retrieved successfully",
      category,
    });
  } catch (error) {
    console.error("Get category error:", error);

    res.status(500).json({
      message: "Server error while retrieving service category",
    });
  }
};

// Update service category
const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, basePrice, isActive } = req.body;

    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Service category not found",
      });
    }

    if (name !== undefined) {
      const existingCategory = await ServiceCategory.findOne({
        name: name.trim(),
        _id: { $ne: category._id },
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Another service category with this name already exists",
        });
      }

      category.name = name.trim();
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (icon !== undefined) {
      category.icon = icon;
    }

    if (basePrice !== undefined) {
      if (basePrice < 0) {
        return res.status(400).json({
          message: "Base price cannot be negative",
        });
      }

      category.basePrice = basePrice;
    }

    if (isActive !== undefined) {
      category.isActive = isActive;
    }

    const updatedCategory = await category.save();

    res.status(200).json({
      message: "Service category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);

    res.status(500).json({
      message: "Server error while updating service category",
    });
  }
};

// Delete service category
const deleteCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Service category not found",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Service category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    res.status(500).json({
      message: "Server error while deleting service category",
    });
  }
};

module.exports = {
  createCategory,
  getActiveCategories,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};