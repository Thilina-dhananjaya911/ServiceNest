const express = require("express");

const {
  getRequestsWithCounts,
  getRequestDetails,
  getDashboard,
} = require("../controllers/providerPortalController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("provider"));

// Dashboard / Home statistics
router.get("/dashboard", getDashboard);

// Requests page: table rows + tab counts (?status=pending&search=pipe)
router.get("/requests", getRequestsWithCounts);

// Requests page: "View" button
router.get("/requests/:id", getRequestDetails);

// Accept / Reject / Start Job / Mark Complete use the existing routes:
//   PUT /api/service-requests/:id/accept | reject | start | complete

module.exports = router;
