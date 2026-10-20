const express = require("express");

const {
  getCustomerHome,
  getProviders,
} = require("../controllers/customerHomeController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/home", protect, authorize("customer"), getCustomerHome);
router.get("/providers", protect, authorize("customer"), getProviders);

module.exports = router;