const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer: create a complaint
router.post(
  "/",
  protect,
  authorize("customer"),
  createComplaint
);

// Customer: view own complaints
router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyComplaints
);

// Admin: view all complaints
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllComplaints
);

// Customer: view a specific complaint
router.get(
  "/:id",
  protect,
  authorize("customer"),
  getComplaintById
);

// Admin: update complaint
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateComplaint
);

// Customer: delete a pending complaint
router.delete(
  "/:id",
  protect,
  authorize("customer"),
  deleteComplaint
);

module.exports = router;