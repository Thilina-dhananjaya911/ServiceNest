const ProviderProfile = require("../models/ProviderProfile");
const ServiceRequest = require("../models/ServiceRequest");
const Review = require("../models/Review");
const User = require("../models/User");

// Get statistics for the public About Us page
const getAboutStats = async (req, res) => {
  try {
    const eligibleProviders = await ProviderProfile.find({
      isActive: true,
      isVerified: true,
    })
      .select("userId district")
      .lean();

    const providerUserIds = eligibleProviders.map(
      (provider) => provider.userId,
    );

    // Exclude providers whose user accounts are inactive
    const activeProviderCount = await User.countDocuments({
      _id: { $in: providerUserIds },
      isActive: true,
    });

    const activeProviderUsers = await User.find({
      _id: { $in: providerUserIds },
      isActive: true,
    })
      .select("_id")
      .lean();

    const activeProviderUserIds = activeProviderUsers.map((user) => user._id);

    const activeProfiles = eligibleProviders.filter((provider) =>
      activeProviderUserIds.some(
        (userId) => userId.toString() === provider.userId.toString(),
      ),
    );

    const completedJobs = await ServiceRequest.countDocuments({
      status: "completed",
    });

    const districtsCovered = new Set(
      activeProfiles
        .map((provider) => provider.district?.trim().toLowerCase())
        .filter(Boolean),
    ).size;

    const reviewStats = await Review.aggregate([
      {
        $match: {
          isVisible: true,
        },
      },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          positiveReviews: {
            $sum: {
              $cond: [{ $gte: ["$rating", 4] }, 1, 0],
            },
          },
        },
      },
    ]);

    const totalReviews = reviewStats[0]?.totalReviews || 0;
    const positiveReviews = reviewStats[0]?.positiveReviews || 0;

    const customerSatisfaction =
      totalReviews > 0
        ? Number(((positiveReviews / totalReviews) * 100).toFixed(1))
        : null;

    return res.status(200).json({
      message: "About Us statistics retrieved successfully",
      stats: {
        verifiedProviders: activeProviderCount,
        completedJobs,
        districtsCovered,
        customerSatisfaction,
        totalReviews,
      },
    });
  } catch (error) {
    console.error("Get About Us statistics error:", error);

    return res.status(500).json({
      message: "Server error while retrieving About Us statistics",
    });
  }
};

module.exports = {
  getAboutStats,
};
