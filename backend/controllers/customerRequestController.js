const ServiceRequest = require("../models/ServiceRequest");

const ACTIVE = ["pending", "accepted", "in_progress"];
const HISTORY = ["completed", "cancelled", "rejected"];
const ALL = [...ACTIVE, ...HISTORY];

// GET /api/customer/requests?status=&group=active|history&page=&limit=
const getCustomerRequests = async (req, res) => {
  try {
    const { status, group, page = 1, limit = 10 } = req.query;
    const filter = { customerId: req.user._id };

    if (status) {
      if (!ALL.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      filter.status = status;
    } else if (group === "active") {
      filter.status = { $in: ACTIVE };
    } else if (group === "history") {
      filter.status = { $in: HISTORY };
    }

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const [requests, total, grouped] = await Promise.all([
      ServiceRequest.find(filter)
        .populate("providerId", "fullName username contactNo")
        .populate("serviceId", "name basePrice")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      ServiceRequest.countDocuments(filter),
      ServiceRequest.aggregate([
        { $match: { customerId: req.user._id } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const counts = Object.fromEntries(ALL.map((s) => [s, 0]));
    grouped.forEach((g) => (counts[g._id] = g.count));

    res.status(200).json({
      message: "Requests retrieved successfully",
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      counts,
      requests,
    });
  } catch (error) {
    console.error("Get customer requests error:", error);
    res.status(500).json({ message: "Server error while retrieving requests" });
  }
};

module.exports = { getCustomerRequests };