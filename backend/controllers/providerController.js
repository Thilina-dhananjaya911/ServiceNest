const ProviderProfile = require("../models/ProviderProfile");
const ProviderService = require("../models/ProviderService");
const Service = require("../models/Service");
const ServiceCategory = require("../models/ServiceCategory");

// Create provider profile
const createProviderProfile = async (req, res) => {
  try {
    // Make sure the logged-in user is a provider
    if (req.user.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can create a provider profile",
      });
    }

    // Check if profile already exists
    const existingProfile = await ProviderProfile.findOne({
      userId: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Provider profile already exists",
      });
    }

    const {
  description,
  experienceYears,
  province,
  district,
  area,
  address,
} = req.body;

// Area is required
if (!area || !area.trim()) {
  return res.status(400).json({
    message: "Area is required",
  });
}

// Validate experience years
if (experienceYears !== undefined) {
  if (
    typeof experienceYears !== "number" ||
    experienceYears < 0
  ) {
    return res.status(400).json({
      message:
        "Experience years must be a non-negative number",
    });
  }
}

const providerProfile = await ProviderProfile.create({
  userId: req.user._id,
  description: description || "",
  experienceYears:
    experienceYears !== undefined ? experienceYears : 0,
  province: province || "",
  district: district || "",
  area: area.trim(),
  address: address || "",
});
    res.status(201).json({
      message: "Provider profile created successfully",
      profile: providerProfile,
    });
  } catch (error) {
    console.error("Create provider profile error:", error);

    res.status(500).json({
      message: "Server error while creating provider profile",
    });
  }
};

// Get logged-in provider profile
const getMyProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      userId: req.user._id,
    }).populate(
      "userId",
      "fullName username email contactNo profileImage"
    );

    if (!profile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    res.status(200).json({
      message: "Provider profile retrieved successfully",
      profile,
    });
  } catch (error) {
    console.error("Get provider profile error:", error);

    res.status(500).json({
      message: "Server error while retrieving provider profile",
    });
  }
};

// Update logged-in provider profile
const updateProviderProfile = async (req, res) => {
  try {
    const {
      description,
      experienceYears,
      province,
      district,
      area,
      address,
    } = req.body;

    const profile = await ProviderProfile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    // Update only fields that were provided
    if (description !== undefined) {
      profile.description = description;
    }

    if (experienceYears !== undefined) {
      if (experienceYears < 0) {
        return res.status(400).json({
          message: "Experience years cannot be negative",
        });
      }

      profile.experienceYears = experienceYears;
    }

    if (province !== undefined) {
      profile.province = province;
    }

    if (district !== undefined) {
      profile.district = district;
    }

    if (area !== undefined) {
      if (!area.trim()) {
        return res.status(400).json({
          message: "Area cannot be empty",
        });
      }

      profile.area = area;
    }

    if (address !== undefined) {
      profile.address = address;
    }

    const updatedProfile = await profile.save();

    res.status(200).json({
      message: "Provider profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update provider profile error:", error);

    res.status(500).json({
      message: "Server error while updating provider profile",
    });
  }
};

// Get a provider profile by user ID
const getProviderProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await ProviderProfile.findOne({
      userId,
      isActive: true,
    }).populate(
      "userId",
      "fullName username email contactNo profileImage"
    );

    if (!profile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    res.status(200).json({
      message: "Provider profile retrieved successfully",
      profile,
    });
  } catch (error) {
    console.error("Get provider profile by user ID error:", error);

    res.status(500).json({
      message: "Server error while retrieving provider profile",
    });
  }
};

// Get all active provider profiles

const getAllProviders = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    // Get active and verified provider profiles
    const filter = {
      isActive: true,
      isVerified: true,
    };

    if (location && location.trim()) {
      const locationRegex = new RegExp(
        location.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { area: locationRegex },
        { district: locationRegex },
        { province: locationRegex },
      ];
    }

    let providers = await ProviderProfile.find(filter)
      .populate(
        "userId",
        "fullName username email contactNo profileImage"
      )
      .sort({ isNewProvider: -1, ratingAverage: -1, createdAt: -1 })
      .lean();

    // Get active services offered by these providers
    const providerIds = providers
      .filter((provider) => provider.userId)
      .map((provider) => provider.userId._id);

    const offers = await ProviderService.find({
      providerId: { $in: providerIds },
      isActive: true,
    })
      .populate({
        path: "serviceId",
        select: "name categoryId",
        populate: {
          path: "categoryId",
          select: "name icon",
        },
      })
      .lean();

    const offersByProvider = {};

    offers.forEach((offer) => {
      if (!offer.serviceId) return;

      const providerId = offer.providerId.toString();

      if (!offersByProvider[providerId]) {
        offersByProvider[providerId] = [];
      }

      offersByProvider[providerId].push(offer);
    });

    providers = providers.map((provider) => {
      const providerOffers =
        offersByProvider[provider.userId?._id.toString()] || [];

      const serviceNames = [
        ...new Set(
          providerOffers.map((offer) => offer.serviceId.name)
        ),
      ];

      const categories = [
        ...new Map(
          providerOffers
            .filter((offer) => offer.serviceId.categoryId)
            .map((offer) => [
              offer.serviceId.categoryId._id.toString(),
              {
                _id: offer.serviceId.categoryId._id,
                name: offer.serviceId.categoryId.name,
                icon: offer.serviceId.categoryId.icon,
              },
            ])
        ).values(),
      ];

      const pricesFrom = providerOffers.map(
        (offer) => offer.priceFrom
      );

      const pricesTo = providerOffers.map((offer) =>
        offer.priceTo != null ? offer.priceTo : offer.priceFrom
      );

      return {
        ...provider,
        services: serviceNames,
        categories,
        priceFrom: pricesFrom.length
          ? Math.min(...pricesFrom)
          : null,
        priceTo: pricesTo.length
          ? Math.max(...pricesTo)
          : null,
      };
    });

    // Filter by provider name, username, service, or category
    if (search && search.trim()) {
      const searchText = search.trim().toLowerCase();

      providers = providers.filter((provider) => {
        const fullName = provider.userId?.fullName || "";
        const username = provider.userId?.username || "";
        const serviceMatch = provider.services.some((name) =>
          name.toLowerCase().includes(searchText)
        );
        const categoryMatch = provider.categories.some((item) =>
          item.name.toLowerCase().includes(searchText)
        );

        return (
          fullName.toLowerCase().includes(searchText) ||
          username.toLowerCase().includes(searchText) ||
          serviceMatch ||
          categoryMatch
        );
      });
    }

    // Filter by category name or category ID
    if (category && category.trim()) {
      const categoryText = category.trim().toLowerCase();

      providers = providers.filter((provider) =>
        provider.categories.some(
          (item) =>
            item._id.toString() === category.trim() ||
            item.name.toLowerCase() === categoryText
        )
      );
    }

    res.status(200).json({
      message: "Providers retrieved successfully",
      count: providers.length,
      providers,
    });
  } catch (error) {
    console.error("Get all providers error:", error);

    res.status(500).json({
      message: "Server error while retrieving providers",
    });
  }
};


module.exports = {
  createProviderProfile,
  getMyProviderProfile,
  updateProviderProfile,
  getProviderProfileByUserId,
  getAllProviders,
};

