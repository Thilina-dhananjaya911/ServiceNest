
const ProviderProfile = require("../models/ProviderProfile");
const ProviderService = require("../models/ProviderService");
const ServiceRequest = require("../models/ServiceRequest");

// Service Provider Home Page
const getProviderHome = async (req, res) => {
  try {
    const providerId = req.user._id;

    const [profile, servicesCount, pendingCount, recentRequests] =
      await Promise.all([
        ProviderProfile.findOne({ userId: providerId })
          .populate("userId", "fullName email profileImage"),

        ProviderService.countDocuments({
          providerId,
          isActive: true
        }),

        ServiceRequest.countDocuments({
          providerId,
          status: "pending"
        }),

        ServiceRequest.find({ providerId })
          .populate("customerId", "fullName")
          .populate("serviceId", "name")
          .sort({ createdAt: -1 })
          .limit(5)
      ]);

    return res.status(200).json({
      message: "Provider home data retrieved",
      provider: {
        name: req.user.fullName,
        profile
      },
      activeServices: servicesCount,
      pendingRequests: pendingCount,
      recentRequests
    });

  } catch (error) {
    console.error("Provider home error:", error);
    return res.status(500).json({
      message: "Failed to retrieve provider home"
    });
  }
};

// Service Provider Dashboard
const getProviderDashboard = async (req, res) => {
  try {
    const providerId = req.user._id;

    const [
      totalRequests,
      pendingRequests,
      acceptedRequests,
      inProgressRequests,
      completedRequests,
      activeServices,
      earningsResult
    ] = await Promise.all([
      ServiceRequest.countDocuments({ providerId }),

      ServiceRequest.countDocuments({
        providerId, status: "pending"
      }),

      ServiceRequest.countDocuments({
        providerId, status: "accepted"
      }),

      ServiceRequest.countDocuments({
        providerId, status: "in_progress"
      }),

      ServiceRequest.countDocuments({
        providerId, status: "completed"
      }),

      ProviderService.countDocuments({
        providerId, isActive: true
      }),

      ServiceRequest.aggregate([
        {
          $match: {
            providerId,
            status: "completed"
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$agreedPrice" }
          }
        }
      ])
    ]);

    return res.status(200).json({
      message: "Dashboard retrieved successfully",
      stats: {
        totalRequests,
        pendingRequests,
        acceptedRequests,
        inProgressRequests,
        completedRequests,
        activeServices,
        totalEarnings: earningsResult[0]?.total || 0
      }
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      message: "Failed to retrieve dashboard"
    });
  }
};

module.exports = {
  getProviderHome,
  getProviderDashboard
};
