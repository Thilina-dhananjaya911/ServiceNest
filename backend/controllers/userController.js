const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (fullName !== undefined && !fullName.trim()) {
  return res.status(400).json({
    message: "Full name cannot be empty",
  });
}   
     
    if (contactNo !== undefined && !contactNo.trim()) {
  return res.status(400).json({
    message: "Contact number cannot be empty",
  });
}

    res.status(200).json({
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server error while retrieving profile",
    });
  }
};

// Update logged-in user's profile
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      username,
      contactNo,
      address,
      city,
      nicNo,
      nicPhoto,
      profileImage,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check username uniqueness if username is being changed
    if (username && username.toLowerCase() !== user.username) {
      const existingUsername = await User.findOne({
        username: username.toLowerCase(),
        _id: { $ne: user._id },
      });

      if (existingUsername) {
        return res.status(400).json({
          message: "This username is already taken",
        });
      }

      user.username = username.toLowerCase();
    }

    // Update fields only if provided
    if (fullName !== undefined) user.fullName = fullName;
    if (contactNo !== undefined) user.contactNo = contactNo;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (nicNo !== undefined) user.nicNo = nicNo;
    if (nicPhoto !== undefined) user.nicPhoto = nicPhoto;
    if (profileImage !== undefined) user.profileImage = profileImage;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        contactNo: updatedUser.contactNo,
        address: updatedUser.address,
        city: updatedUser.city,
        nicNo: updatedUser.nicNo,
        nicPhoto: updatedUser.nicPhoto,
        profileImage: updatedUser.profileImage,
        isActive: updatedUser.isActive,
        isVerified: updatedUser.isVerified,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Server error while updating profile",
    });
  }
};

// Change logged-in user's password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    res.status(500).json({
      message: "Server error while changing password",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};