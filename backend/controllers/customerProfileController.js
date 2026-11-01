const User = require("../models/User");
const ProviderProfile = require("../models/ProviderProfile");
const ServiceRequest = require("../models/ServiceRequest");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

const ACTIVE = ["pending", "accepted", "in_progress"];

// GET /api/customer/profile
const getCustomerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "fullName username email contactNo city address profileImage isVerified savedProviders createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [activeRequests, profiles] = await Promise.all([
      ServiceRequest.countDocuments({
        customerId: user._id,
        status: { $in: ACTIVE },
      }),
      ProviderProfile.find({
        userId: { $in: user.savedProviders },
        isActive: true,
      }).populate("userId", "fullName profileImage"),
    ]);

    const savedProviders = profiles
      .filter((p) => p.userId)
      .map((p) => ({
        providerId: p.userId._id,
        fullName: p.userId.fullName,
        profileImage: p.userId.profileImage,
        area: p.area,
        district: p.district,
        ratingAverage: p.ratingAverage,
        totalReviews: p.totalReviews,
        isVerified: p.isVerified,
      }));

    res.status(200).json({
      message: "Profile retrieved successfully",
      profile: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        contactNo: user.contactNo,
        city: user.city,
        address: user.address,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
        memberSince: user.createdAt,
      },
      activeRequests,
      savedProviders,
    });
  } catch (error) {
    console.error("Get customer profile error:", error);
    res.status(500).json({ message: "Server error while retrieving profile" });
  }
};

// PUT /api/customer/profile
const updateCustomerProfile = async (req, res) => {
  try {
    const { fullName, contactNo, city, address } = req.body;
    const updates = {};

    if (fullName !== undefined) {
      const name = String(fullName).trim();
      if (name.length < 2 || name.length > 60) {
        return res
          .status(400)
          .json({ message: "Full name must be 2-60 characters" });
      }
      updates.fullName = name;
    }

    if (contactNo !== undefined) {
      const phone = String(contactNo).replace(/[\s-]/g, "");
      if (!/^(\+94|0)\d{9}$/.test(phone)) {
        return res
          .status(400)
          .json({ message: "Enter a valid Sri Lankan phone number" });
      }
      updates.contactNo = phone;
    }

    if (city !== undefined) updates.city = String(city).trim();

    if (address !== undefined) {
      const addr = String(address).trim();
      if (addr.length > 200) {
        return res
          .status(400)
          .json({ message: "Address is too long (max 200 characters)" });
      }
      updates.address = addr;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("fullName username email contactNo city address profileImage isVerified createdAt");

    res.status(200).json({
      message: "Profile updated successfully",
      profile: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        contactNo: user.contactNo,
        city: user.city,
        address: user.address,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
        memberSince: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update customer profile error:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

// PUT /api/customer/profile/password
const changeCustomerPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from the current one" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error while changing password" });
  }
};

// POST /api/customer/saved-providers/:providerId
const saveProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      return res.status(400).json({ message: "Invalid provider ID" });
    }

    const provider = await User.findOne({
      _id: providerId,
      role: "provider",
      isActive: true,
    });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedProviders: providerId },
    });

    res.status(200).json({ message: "Provider saved" });
  } catch (error) {
    console.error("Save provider error:", error);
    res.status(500).json({ message: "Server error while saving provider" });
  }
};

// DELETE /api/customer/saved-providers/:providerId
const removeSavedProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      return res.status(400).json({ message: "Invalid provider ID" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedProviders: providerId },
    });

    res.status(200).json({ message: "Provider removed from saved list" });
  } catch (error) {
    console.error("Remove saved provider error:", error);
    res.status(500).json({ message: "Server error while removing provider" });
  }
};

// PUT /api/customer/profile/avatar
const updateCustomerAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "servicenest/avatars" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: result.secure_url },
      { new: true }
    ).select("profileImage");

    res.status(200).json({
      message: "Profile photo updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: "Server error while uploading photo" });
  }
};

module.exports = {
  getCustomerProfile,
  updateCustomerProfile,
  changeCustomerPassword,
  saveProvider,
  removeSavedProvider,
  updateCustomerAvatar,
};