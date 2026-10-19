const express = require("express");

const {
  createReview,
  getProviderReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer: create a review
router.post(
  "/",
  protect,
  authorize("customer"),
  createReview
);

// Customer: view their own reviews
router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyReviews
);

// Customers and providers: view reviews for a provider
router.get(
  "/provider/:providerId",
  protect,
  authorize("customer", "provider"),
  getProviderReviews
);

// Customer: update own review
router.put(
  "/:id",
  protect,
  authorize("customer"),
  updateReview
);

// Customer: delete own review
router.delete(
  "/:id",
  protect,
  authorize("customer"),
  deleteReview
);

module.exports = router;