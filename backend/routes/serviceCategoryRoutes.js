const express = require("express");

const {
  createCategory,
  getActiveCategories,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/serviceCategoryController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customers and providers can view active categories
router.get(
  "/",
  protect,
  authorize("customer", "provider"),
  getActiveCategories
);

// Admin can view all categories
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllCategories
);

// Admin can create a category
router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory
);

// Admin can update a category
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCategory
);

// Admin can delete a category
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategory
);

// Customers and providers can view a specific category
router.get(
  "/:id",
  protect,
  authorize("customer", "provider"),
  getCategoryById
);

module.exports = router;