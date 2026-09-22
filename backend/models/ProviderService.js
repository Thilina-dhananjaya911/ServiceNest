const mongoose = require("mongoose");

const providerServiceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    priceFrom: {
      type: Number,
      min: 0
    },

    priceTo: {
      type: Number,
      min: 0
    },

    description: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ProviderService",
  providerServiceSchema
);