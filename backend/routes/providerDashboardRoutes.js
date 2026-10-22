
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getProviderHome,
  getProviderDashboard
} = require("../controllers/providerDashboardController");

router.get(
  "/home",
  protect,
  authorize("provider"),
  getProviderHome
);

router.get(
  "/dashboard",
  protect,
  authorize("provider"),
  getProviderDashboard
);

module.exports = router;
