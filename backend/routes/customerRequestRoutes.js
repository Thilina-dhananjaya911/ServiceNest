const express = require("express");
const { getCustomerRequests } = require("../controllers/customerRequestController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, authorize("customer"), getCustomerRequests);

module.exports = router;