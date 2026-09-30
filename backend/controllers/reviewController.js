const Review = require("../models/Review");
const ServiceRequest = require("../models/ServiceRequest");
const ProviderProfile = require("../models/ProviderProfile");

// Create a review
const createReview = async (req, res) => {
  try {
    const {
      serviceRequestId,
      rating,
      comment,
    } = req.body;

    if (!serviceRequestId || rating === undefined) {
      return res.status(400).json({
        message: "Service request and rating are required",
      });
    }

    if (
  typeof rating !== "number" ||
  rating < 1 ||
  rating > 5
) {
  return res.status(400).json({
    message: "Rating must be a number between 1 and 5",
  });
}
    // Find the service request
    const serviceRequest = await ServiceRequest.findById(
      serviceRequestId
    );

    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }

    // Only the customer who created the request can review it
    if (
      serviceRequest.customerId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only review your own service requests",
      });
    }

    // Only completed services can be reviewed
    if (serviceRequest.status !== "completed") {
      return res.status(400).json({
        message: "Only completed services can be reviewed",
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      serviceRequestId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this service",
      });
    }

    const review = await Review.create({
      customerId: req.user._id,
      providerId: serviceRequest.providerId,
      serviceRequestId,
      rating,
      comment: comment || "",
    });

    // Update provider's rating
    const providerReviews = await Review.find({
      providerId: serviceRequest.providerId,
      isVisible: true,
    });

    const totalReviews = providerReviews.length;

    const ratingTotal = providerReviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const ratingAverage =
      totalReviews > 0
        ? ratingTotal / totalReviews
        : 0;

    await ProviderProfile.findOneAndUpdate(
      {
        userId: serviceRequest.providerId,
      },
      {
        ratingAverage: Number(ratingAverage.toFixed(2)),
        totalReviews,
      }
    );

    const populatedReview = await Review.findById(review._id)
      .populate(
        "customerId",
        "fullName username profileImage"
      )
      .populate(
        "providerId",
        "fullName username profileImage"
      );

    res.status(201).json({
      message: "Review created successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Create review error:", error);

    res.status(500).json({
      message: "Server error while creating review",
    });
  }
};


// Get reviews for a provider
const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;

    const reviews = await Review.find({
      providerId,
      isVisible: true,
    })
      .populate(
        "customerId",
        "fullName username profileImage"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Provider reviews retrieved successfully",
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get provider reviews error:", error);

    res.status(500).json({
      message: "Server error while retrieving provider reviews",
    });
  }
};


// Get reviews written by logged-in customer
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      customerId: req.user._id,
    })
      .populate(
        "providerId",
        "fullName username profileImage"
      )
      .populate(
        "serviceRequestId",
        "serviceId requestedDate status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your reviews retrieved successfully",
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get my reviews error:", error);

    res.status(500).json({
      message: "Server error while retrieving your reviews",
    });
  }
};


// Update own review
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOne({
      _id: req.params.id,
      customerId: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (rating !== undefined) {
  if (
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5
  ) {
    return res.status(400).json({
      message: "Rating must be a number between 1 and 5",
    });
  }

  review.rating = rating;
}

    if (comment !== undefined) {
      review.comment = comment;
    }

    const updatedReview = await review.save();

    // Recalculate provider rating
    const providerReviews = await Review.find({
      providerId: review.providerId,
      isVisible: true,
    });

    const totalReviews = providerReviews.length;

    const ratingTotal = providerReviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const ratingAverage =
      totalReviews > 0
        ? ratingTotal / totalReviews
        : 0;

    await ProviderProfile.findOneAndUpdate(
      {
        userId: review.providerId,
      },
      {
        ratingAverage: Number(ratingAverage.toFixed(2)),
        totalReviews,
      }
    );

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Update review error:", error);

    res.status(500).json({
      message: "Server error while updating review",
    });
  }
};


// Delete own review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      customerId: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    const providerId = review.providerId;

    await review.deleteOne();

    // Recalculate provider rating
    const providerReviews = await Review.find({
      providerId,
      isVisible: true,
    });

    const totalReviews = providerReviews.length;

    const ratingTotal = providerReviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const ratingAverage =
      totalReviews > 0
        ? ratingTotal / totalReviews
        : 0;

    await ProviderProfile.findOneAndUpdate(
      {
        userId: providerId,
      },
      {
        ratingAverage: Number(ratingAverage.toFixed(2)),
        totalReviews,
      }
    );

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      message: "Server error while deleting review",
    });
  }
};


module.exports = {
  createReview,
  getProviderReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};