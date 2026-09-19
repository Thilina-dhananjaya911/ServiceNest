const mongoose = require("mongoose");

const providerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0
    },

    phone: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    province: {
      type: String,
      required: true
    },

    district: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    totalReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ProviderProfile",
  providerProfileSchema
);