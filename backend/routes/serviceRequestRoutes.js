const express = require("express");

const {
  createServiceRequest,
  getMyRequests,
  getProviderRequests,
  getRequestById,
  acceptRequest,
  rejectRequest,
  startRequest,
  completeRequest,
  cancelRequest,
} = require("../controllers/serviceRequestController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer: create a service request
router.post(
  "/",
  protect,
  authorize("customer"),
  createServiceRequest
);

// Customer: view own requests
router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyRequests
);

// Provider: view requests assigned to them
router.get(
  "/provider",
  protect,
  authorize("provider"),
  getProviderRequests
);

// Customer/provider: view a specific request
router.get(
  "/:id",
  protect,
  authorize("customer", "provider"),
  getRequestById
);

// Provider: accept request
router.put(
  "/:id/accept",
  protect,
  authorize("provider"),
  acceptRequest
);

// Provider: reject request
router.put(
  "/:id/reject",
  protect,
  authorize("provider"),
  rejectRequest
);

// Provider: start service
router.put(
  "/:id/start",
  protect,
  authorize("provider"),
  startRequest
);

// Provider: complete service
router.put(
  "/:id/complete",
  protect,
  authorize("provider"),
  completeRequest
);

// Customer: cancel request
router.put(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelRequest
);

module.exports = router;