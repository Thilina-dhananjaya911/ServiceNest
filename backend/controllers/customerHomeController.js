const ServiceCategory = require("../models/ServiceCategory");
const ProviderProfile = require("../models/ProviderProfile");
const ProviderService = require("../models/ProviderService");
const Service = require("../models/Service");

const USER_FIELDS = "fullName username contactNo profileImage";

// New providers first, then the others (best rated first)
const PROVIDER_SORT = { isNewProvider: -1, ratingAverage: -1, createdAt: -1 };

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Turn provider profiles into cards (adds service names and price range)
const buildProviderCards = async (profiles) => {
  const valid = profiles.filter((p) => p.userId);
  const userIds = valid.map((p) => p.userId._id);

  const offers = await ProviderService.find({
    providerId: { $in: userIds },
    isActive: true,
  }).populate("serviceId", "name");

  const offersByProvider = {};
  offers.forEach((offer) => {
    if (!offer.serviceId) return;
    const key = offer.providerId.toString();
    if (!offersByProvider[key]) offersByProvider[key] = [];
    offersByProvider[key].push(offer);
  });

  return valid.map((p) => {
    const list = offersByProvider[p.userId._id.toString()] || [];
    const lows = list.map((o) => o.priceFrom);
    const highs = list.map((o) => (o.priceTo != null ? o.priceTo : o.priceFrom));

    return {
      userId: p.userId._id,
      fullName: p.userId.fullName,
      username: p.userId.username,
      profileImage: p.userId.profileImage,
      area: p.area,
      district: p.district,
      province: p.province,
      description: p.description,
      experienceYears: p.experienceYears,
      ratingAverage: p.ratingAverage,
      totalReviews: p.totalReviews,
      completedJobs: p.completedJobs,
      isNewProvider: p.isNewProvider,
      services: list.map((o) => o.serviceId.name),
      priceFrom: lows.length ? Math.min(...lows) : null,
      priceTo: highs.length ? Math.max(...highs) : null,
    };
  });
};

// GET /api/customer/home
// Customer name + service categories (the "Popular" pills)
const getCustomerHome = async (req, res) => {
  try {
    const categories = await ServiceCategory.find({ isActive: true }).sort({
      name: 1,
    });

    res.status(200).json({
      message: "Customer home data retrieved successfully",
      customer: {
        id: req.user._id,
        fullName: req.user.fullName,
        username: req.user.username,
        profileImage: req.user.profileImage,
      },
      categories,
    });
  } catch (error) {
    console.error("Customer home error:", error);
    res.status(500).json({
      message: "Server error while retrieving customer home data",
    });
  }
};

// GET /api/customer/providers?service=&location=
// - no params: all providers (new first, then others)
// - service: checks we offer it, then filters providers of that service
// - location: filters by area / district / province
//   if nobody is in that location -> message + all providers of the service
const getProviders = async (req, res) => {
  try {
    const service = (req.query.service || "").trim();
    const location = (req.query.location || "").trim();

    const filter = { isActive: true, isVerified: true };

    // 1. Do we offer this service?
    if (service) {
      const regex = new RegExp(escapeRegex(service), "i");

      const categoryIds = await ServiceCategory.find({
        name: regex,
        isActive: true,
      }).distinct("_id");

      const serviceIds = await Service.find({
        isActive: true,
        $or: [{ name: regex }, { categoryId: { $in: categoryIds } }],
      }).distinct("_id");

      if (serviceIds.length === 0) {
        return res.status(200).json({
          serviceFound: false,
          locationMatched: false,
          message: `Sorry, we don't offer "${service}" yet.`,
          total: 0,
          providers: [],
        });
      }

      const providerIds = await ProviderService.find({
        serviceId: { $in: serviceIds },
        isActive: true,
      }).distinct("providerId");

      filter.userId = { $in: providerIds };
    }

    // 2. Providers (new first, then others)
    const all = await ProviderProfile.find(filter)
      .sort(PROVIDER_SORT)
      .populate("userId", USER_FIELDS);

    let profiles = all;
    let locationMatched = true;
    let message = "";

    // 3. Filter by location
    if (location && all.length > 0) {
      const regex = new RegExp(escapeRegex(location), "i");
      const inLocation = all.filter(
        (p) => regex.test(p.area) || regex.test(p.district) || regex.test(p.province)
      );

      if (inLocation.length > 0) {
        profiles = inLocation;
      } else {
        locationMatched = false;
        message = service
          ? `No ${service} providers found in ${location}. Showing all ${service} providers.`
          : `No providers found in ${location}. Showing all providers.`;
      }
    }

    if (all.length === 0) {
      message = service
        ? `No providers are available for ${service} right now.`
        : "No providers are available right now.";
    }

    const providers = await buildProviderCards(profiles);

    res.status(200).json({
      serviceFound: true,
      locationMatched,
      message,
      total: providers.length,
      providers,
    });
  } catch (error) {
    console.error("Get providers error:", error);
    res.status(500).json({
      message: "Server error while retrieving providers",
    });
  }
};

module.exports = {
  getCustomerHome,
  getProviders,
};