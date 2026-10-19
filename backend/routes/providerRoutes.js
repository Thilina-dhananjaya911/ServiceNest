const express = require("express");

const {
  createProviderProfile,
  getMyProviderProfile,
  updateProviderProfile,
  getProviderProfileByUserId,
  getAllProviders,
} = require("../controllers/providerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all verified and active providers
// Customers and providers can access this
router.get(
  "/",
  protect,
  authorize("customer", "provider"),
  getAllProviders
);

// Create provider profile
router.post(
  "/profile",
  protect,
  authorize("provider"),
  createProviderProfile
);

// Get logged-in provider's profile
router.get(
  "/profile/me",
  protect,
  authorize("provider"),
  getMyProviderProfile
);

// Update logged-in provider's profile
router.put(
  "/profile/me",
  protect,
  authorize("provider"),
  updateProviderProfile
);

// Get a specific provider profile
// Customers and providers can access this
router.get(
  "/:userId",
  protect,
  authorize("customer", "provider"),
  getProviderProfileByUserId
);

module.exports = router;