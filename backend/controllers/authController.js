const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Register user
const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      role,
      contactNo,
      address,
      city,
      nicNo,
      nicPhoto,
      profileImage,
    } = req.body;

    // Check required fields
    if (!fullName || !username || !email || !password || !contactNo) {
      return res.status(400).json({
        message:
          "Full name, username, email, password and contact number are required",
      });
    }

    // Check whether email already exists
    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Check whether username already exists
    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "This username is already taken",
      });
    }

    // Only allow customer/provider registration
    const allowedRoles = ["customer", "provider"];

    const userRole = role || "customer";

    if (!allowedRoles.includes(userRole)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
      contactNo,
      address: address || "",
      city: city || "",
      nicNo: nicNo || "",
      nicPhoto: nicPhoto || "",
      profileImage: profileImage || "",
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo,
        address: user.address,
        city: user.city,
        nicNo: user.nicNo,
        nicPhoto: user.nicPhoto,
        profileImage: user.profileImage,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check active status
    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo,
        address: user.address,
        city: user.city,
        nicNo: user.nicNo,
        nicPhoto: user.nicPhoto,
        profileImage: user.profileImage,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
};

module.exports = {
  register,
  login,
};