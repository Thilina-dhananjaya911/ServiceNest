const express = require("express");

const {
  createAvailability,
  getMyAvailability,
  getProviderAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Provider: create or update availability for a day
router.post(
  "/",
  protect,
  authorize("provider"),
  createAvailability
);

// Provider: view own availability
router.get(
  "/my",
  protect,
  authorize("provider"),
  getMyAvailability
);

// Customer/provider: view a specific provider's availability
router.get(
  "/provider/:providerId",
  protect,
  authorize("customer", "provider"),
  getProviderAvailability
);

// Provider: update availability
router.put(
  "/:id",
  protect,
  authorize("provider"),
  updateAvailability
);

// Provider: delete availability
router.delete(
  "/:id",
  protect,
  authorize("provider"),
  deleteAvailability
);

module.exports = router;