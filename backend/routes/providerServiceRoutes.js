const express = require("express");

const {
  getMyServices,
  getAvailableCatalog,
  addService,
  getMyServiceById,
  updateMyService,
  toggleMyService,
  deleteMyService,
} = require("../controllers/providerServiceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// All routes below are for logged-in providers only
router.use(protect, authorize("provider"));

// List own services (search, categoryId, status filters)
router.get("/", getMyServices);

// Catalog services the provider has not added yet
router.get("/catalog", getAvailableCatalog);

// Add a service
router.post("/", addService);

// Activate / deactivate
router.patch("/:id/toggle", toggleMyService);

// View, edit, delete one service
router.get("/:id", getMyServiceById);
router.put("/:id", updateMyService);
router.delete("/:id", deleteMyService);

module.exports = router;
