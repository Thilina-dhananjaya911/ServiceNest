const express = require("express");

const {
  createService,
  getActiveServices,
  getServicesByCategory,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customers and providers can view active services
router.get(
  "/",
  protect,
  authorize("customer", "provider"),
  getActiveServices
);

// Admin can view all services
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllServices
);

// Get services belonging to a specific category
router.get(
  "/category/:categoryId",
  protect,
  authorize("customer", "provider"),
  getServicesByCategory
);

// Get a specific service
router.get(
  "/:id",
  protect,
  authorize("customer", "provider"),
  getServiceById
);

// Admin can create a service
router.post(
  "/",
  protect,
  authorize("admin"),
  createService
);

// Admin can update a service
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateService
);

// Admin can delete a service
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteService
);

module.exports = router;