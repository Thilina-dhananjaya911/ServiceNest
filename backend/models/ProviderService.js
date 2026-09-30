const mongoose = require("mongoose");

const providerServiceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },

    priceTo: {
      type: Number,
      default: null,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

providerServiceSchema.index(
  { providerId: 1, serviceId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "ProviderService",
  providerServiceSchema
);