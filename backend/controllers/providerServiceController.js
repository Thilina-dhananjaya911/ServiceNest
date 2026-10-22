const mongoose = require("mongoose");
const ProviderService = require("../models/ProviderService");
const Service = require("../models/Service");
const ServiceCategory = require("../models/ServiceCategory");

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Shape used by the "Manage Services" table
const formatOffer = (offer, index = 0) => ({
  _id: offer._id,
  no: index + 1,
  serviceId: offer.serviceId ? offer.serviceId._id : null,
  serviceName: offer.serviceId ? offer.serviceId.name : "",
  categoryId:
    offer.serviceId && offer.serviceId.categoryId
      ? offer.serviceId.categoryId._id
      : null,
  category:
    offer.serviceId && offer.serviceId.categoryId
      ? offer.serviceId.categoryId.name
      : "",
  priceFrom: offer.priceFrom,
  priceTo: offer.priceTo,
  description: offer.description,
  isActive: offer.isActive,
  status: offer.isActive ? "Active" : "Inactive",
  createdAt: offer.createdAt,
  updatedAt: offer.updatedAt,
});

const populateOffer = (query) =>
  query.populate({
    path: "serviceId",
    select: "name description basePrice categoryId isActive",
    populate: { path: "categoryId", select: "name" },
  });

// GET /api/provider-services
// Provider: list own services. Query: search, categoryId, status (active|inactive)
const getMyServices = async (req, res) => {
  try {
    const { search, categoryId, status } = req.query;

    const filter = { providerId: req.user._id };

    if (status === "active") filter.isActive = true;
    if (status === "inactive") filter.isActive = false;

    let offers = await populateOffer(
      ProviderService.find(filter).sort({ createdAt: 1 })
    );

    // Drop offers whose catalog service was removed
    offers = offers.filter((o) => o.serviceId);

    if (categoryId) {
      if (!isValidId(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      offers = offers.filter(
        (o) =>
          o.serviceId.categoryId &&
          o.serviceId.categoryId._id.toString() === categoryId
      );
    }

    if (search && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");
      offers = offers.filter((o) => regex.test(o.serviceId.name));
    }

    const services = offers.map((o, i) => formatOffer(o, i));

    res.status(200).json({
      message: "Services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get my services error:", error);

    res.status(500).json({
      message: "Server error while retrieving services",
    });
  }
};

// GET /api/provider-services/catalog
// Provider: active catalog services not yet added (for the Add Service form)
// Query: categoryId (optional)
const getAvailableCatalog = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const mine = await ProviderService.find({
      providerId: req.user._id,
    }).select("serviceId");

    const filter = {
      isActive: true,
      _id: { $nin: mine.map((m) => m.serviceId) },
    };

    if (categoryId) {
      if (!isValidId(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      filter.categoryId = categoryId;
    }

    const services = await Service.find(filter)
      .populate("categoryId", "name")
      .sort({ name: 1 });

    res.status(200).json({
      message: "Available services retrieved successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get catalog error:", error);

    res.status(500).json({
      message: "Server error while retrieving available services",
    });
  }
};

// POST /api/provider-services
// Provider: add a service.
// Body: { serviceId, priceFrom, priceTo?, description?, isActive? }
//   or  { name, categoryId, priceFrom, ... } to add a service that is not in the catalog yet
const addService = async (req, res) => {
  try {
    const {
      serviceId,
      name,
      categoryId,
      priceFrom,
      priceTo,
      description,
      isActive,
    } = req.body;

    if (priceFrom === undefined || priceFrom === null || priceFrom === "") {
      return res.status(400).json({ message: "Price is required" });
    }

    const from = Number(priceFrom);
    const to =
      priceTo === undefined || priceTo === null || priceTo === ""
        ? null
        : Number(priceTo);

    if (Number.isNaN(from) || from < 0) {
      return res.status(400).json({
        message: "Price must be a valid positive number",
      });
    }

    if (to !== null && (Number.isNaN(to) || to < from)) {
      return res.status(400).json({
        message: "Maximum price must be a number not lower than the minimum price",
      });
    }

    if (isActive !== undefined && typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be a boolean" });
    }

    let service;

    if (serviceId) {
      if (!isValidId(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      service = await Service.findById(serviceId);

      if (!service || !service.isActive) {
        return res.status(404).json({ message: "Service not found" });
      }
    } else {
      if (!name || !name.trim() || !categoryId) {
        return res.status(400).json({
          message: "Select a service, or provide a service name and category",
        });
      }

      if (!isValidId(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const category = await ServiceCategory.findById(categoryId);

      if (!category || !category.isActive) {
        return res.status(404).json({ message: "Service category not found" });
      }

      // Reuse an existing catalog service with the same name if there is one
      service = await Service.findOne({
        categoryId,
        name: new RegExp(`^${escapeRegex(name.trim())}$`, "i"),
      });

      if (!service) {
        service = await Service.create({
          categoryId,
          name: name.trim(),
          description: description || "",
          basePrice: from,
        });
      }
    }

    const existing = await ProviderService.findOne({
      providerId: req.user._id,
      serviceId: service._id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already added this service",
      });
    }

    const offer = await ProviderService.create({
      providerId: req.user._id,
      serviceId: service._id,
      priceFrom: from,
      priceTo: to,
      description: description || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    const saved = await populateOffer(ProviderService.findById(offer._id));

    res.status(201).json({
      message: "Service added successfully",
      service: formatOffer(saved),
    });
  } catch (error) {
    console.error("Add service error:", error);

    res.status(500).json({
      message: "Server error while adding service",
    });
  }
};

// GET /api/provider-services/:id
const getMyServiceById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const offer = await populateOffer(
      ProviderService.findOne({
        _id: req.params.id,
        providerId: req.user._id,
      })
    );

    if (!offer) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service retrieved successfully",
      service: formatOffer(offer),
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      message: "Server error while retrieving service",
    });
  }
};

// PUT /api/provider-services/:id
// Body: { priceFrom?, priceTo?, description?, isActive? }
const updateMyService = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const offer = await ProviderService.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!offer) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { priceFrom, priceTo, description, isActive } = req.body;

    if (priceFrom !== undefined) {
      const from = Number(priceFrom);

      if (priceFrom === "" || Number.isNaN(from) || from < 0) {
        return res.status(400).json({
          message: "Price must be a valid positive number",
        });
      }

      offer.priceFrom = from;
    }

    if (priceTo !== undefined) {
      if (priceTo === null || priceTo === "") {
        offer.priceTo = null;
      } else {
        const to = Number(priceTo);

        if (Number.isNaN(to) || to < 0) {
          return res.status(400).json({
            message: "Maximum price must be a valid positive number",
          });
        }

        offer.priceTo = to;
      }
    }

    if (offer.priceTo !== null && offer.priceTo < offer.priceFrom) {
      return res.status(400).json({
        message: "Maximum price cannot be lower than the minimum price",
      });
    }

    if (description !== undefined) {
      offer.description = description;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({ message: "isActive must be a boolean" });
      }
      offer.isActive = isActive;
    }

    await offer.save();

    const saved = await populateOffer(ProviderService.findById(offer._id));

    res.status(200).json({
      message: "Service updated successfully",
      service: formatOffer(saved),
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Server error while updating service",
    });
  }
};

// PATCH /api/provider-services/:id/toggle
// Activate / deactivate (the "⋮" action in the table)
const toggleMyService = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const offer = await ProviderService.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!offer) {
      return res.status(404).json({ message: "Service not found" });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    res.status(200).json({
      message: offer.isActive
        ? "Service activated successfully"
        : "Service deactivated successfully",
      isActive: offer.isActive,
      status: offer.isActive ? "Active" : "Inactive",
    });
  } catch (error) {
    console.error("Toggle service error:", error);

    res.status(500).json({
      message: "Server error while changing service status",
    });
  }
};

// DELETE /api/provider-services/:id
const deleteMyService = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const offer = await ProviderService.findOneAndDelete({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!offer) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      message: "Server error while deleting service",
    });
  }
};

module.exports = {
  getMyServices,
  getAvailableCatalog,
  addService,
  getMyServiceById,
  updateMyService,
  toggleMyService,
  deleteMyService,
};
