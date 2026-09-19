const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

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

    description: {
      type: String,
      required: true
    },

    location: {
      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      district: {
        type: String,
        default: ""
      }
    },

    preferredDate: {
      type: Date,
      required: true
    },

    preferredTime: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "in_progress",
        "completed",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);