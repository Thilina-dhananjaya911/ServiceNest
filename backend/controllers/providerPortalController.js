const mongoose = require("mongoose");
const ServiceRequest = require("../models/ServiceRequest");
const ProviderProfile = require("../models/ProviderProfile");
const ProviderService = require("../models/ProviderService");
const Availability = require("../models/Availability");
const Notification = require("../models/Notification");
const Message = require("../models/Message");

const STATUSES = [
  "pending",
  "accepted",
  "in_progress",
  "completed",
  "rejected",
  "cancelled",
];

const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Counts per status for the provider (used by the Requests tabs)
const getStatusCounts = async (providerId) => {
  const rows = await ServiceRequest.aggregate([
    { $match: { providerId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const counts = { all: 0 };
  STATUSES.forEach((s) => (counts[s] = 0));

  rows.forEach((row) => {
    counts[row._id] = row.count;
    counts.all += row.count;
  });

  return counts;
};

// Shape used by the Requests table
const formatRequestRow = (request) => ({
  _id: request._id,
  serviceName: request.serviceId ? request.serviceId.name : "",
  customerName: request.customerId ? request.customerId.fullName : "",
  customerPhone: request.customerId ? request.customerId.contactNo : "",
  customerImage: request.customerId ? request.customerId.profileImage : "",
  date: request.requestedDate,
  location: request.address,
  city: request.customerId ? request.customerId.city : "",
  status: request.status,
  statusLabel: STATUS_LABELS[request.status] || request.status,
  agreedPrice: request.agreedPrice,
  createdAt: request.createdAt,
  // Which action buttons the UI should show
  actions: {
    canAccept: request.status === "pending",
    canReject: request.status === "pending",
    canStart: request.status === "accepted",
    canComplete: request.status === "in_progress",
  },
});

// GET /api/provider-portal/requests
// Query: status (pending|accepted|in_progress|completed|rejected|cancelled), search
// Returns the table rows + the counts shown on the tabs
const getRequestsWithCounts = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = { providerId: req.user._id };

    if (status && status !== "all") {
      if (!STATUSES.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Use: ${STATUSES.join(", ")}`,
        });
      }
      filter.status = status;
    }

    let requests = await ServiceRequest.find(filter)
      .populate("customerId", "fullName contactNo city profileImage")
      .populate("serviceId", "name")
      .sort({ createdAt: -1 });

    if (search && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");

      requests = requests.filter(
        (r) =>
          (r.serviceId && regex.test(r.serviceId.name)) ||
          (r.customerId && regex.test(r.customerId.fullName)) ||
          regex.test(r.address)
      );
    }

    const counts = await getStatusCounts(req.user._id);

    res.status(200).json({
      message: "Requests retrieved successfully",
      counts,
      count: requests.length,
      requests: requests.map(formatRequestRow),
    });
  } catch (error) {
    console.error("Get requests with counts error:", error);

    res.status(500).json({
      message: "Server error while retrieving requests",
    });
  }
};

// GET /api/provider-portal/requests/:id
// Full details for the "View" button
const getRequestDetails = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    })
      .populate("customerId", "fullName email contactNo city address profileImage")
      .populate("serviceId", "name description basePrice");

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.status(200).json({
      message: "Request retrieved successfully",
      request: {
        ...formatRequestRow(request),
        description: request.description,
        customer: request.customerId,
        service: request.serviceId,
      },
    });
  } catch (error) {
    console.error("Get request details error:", error);

    res.status(500).json({
      message: "Server error while retrieving request",
    });
  }
};

// GET /api/provider-portal/dashboard
// Stats + recent requests for the Dashboard / Home pages
const getDashboard = async (req, res) => {
  try {
    const providerId = req.user._id;

    const [
      counts,
      earningsRows,
      profile,
      activeServices,
      recent,
      availability,
      unreadNotifications,
      unreadMessages,
    ] = await Promise.all([
      getStatusCounts(providerId),
      ServiceRequest.aggregate([
        { $match: { providerId, status: "completed" } },
        {
          $group: {
            _id: null,
            total: { $sum: { $ifNull: ["$agreedPrice", 0] } },
          },
        },
      ]),
      ProviderProfile.findOne({ userId: providerId }),
      ProviderService.countDocuments({ providerId, isActive: true }),
      ServiceRequest.find({ providerId })
        .populate("customerId", "fullName contactNo city profileImage")
        .populate("serviceId", "name")
        .sort({ createdAt: -1 })
        .limit(5),
      Availability.find({ providerId }),
      Notification.countDocuments({ userId: providerId, isRead: false }),
      Message.countDocuments({ receiverId: providerId, isRead: false }),
    ]);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[new Date().getDay()];
    const todayAvailability = availability.find((a) => a.dayOfWeek === today);

    res.status(200).json({
      message: "Dashboard retrieved successfully",
      provider: {
        fullName: req.user.fullName,
        profileImage: req.user.profileImage,
        isVerified: profile ? profile.isVerified : req.user.isVerified,
        ratingAverage: profile ? profile.ratingAverage : 0,
        totalReviews: profile ? profile.totalReviews : 0,
        completedJobs: profile ? profile.completedJobs : counts.completed,
      },
      stats: {
        totalRequests: counts.all,
        pending: counts.pending,
        accepted: counts.accepted,
        inProgress: counts.in_progress,
        completed: counts.completed,
        rejected: counts.rejected,
        cancelled: counts.cancelled,
        totalEarnings: earningsRows.length ? earningsRows[0].total : 0,
        activeServices,
        unreadNotifications,
        unreadMessages,
      },
      today: {
        day: today,
        isAvailable: todayAvailability ? todayAvailability.isAvailable : false,
        startTime: todayAvailability ? todayAvailability.startTime : null,
        endTime: todayAvailability ? todayAvailability.endTime : null,
      },
      recentRequests: recent.map(formatRequestRow),
    });
  } catch (error) {
    console.error("Get dashboard error:", error);

    res.status(500).json({
      message: "Server error while retrieving dashboard",
    });
  }
};

module.exports = {
  getRequestsWithCounts,
  getRequestDetails,
  getDashboard,
};
