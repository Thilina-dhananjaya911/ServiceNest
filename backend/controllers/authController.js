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
    },
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
    } = req.body || {};

    // Check that required fields are present and are strings
    if (
      typeof fullName !== "string" ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof contactNo !== "string" ||
      !fullName ||
      !username ||
      !email ||
      !password ||
      !contactNo
    ) {
      return res.status(400).json({
        message:
          "Full name, username, email, password and contact number are required",
      });
    }

    // Validate that name, username and contact number are not blank
    if (!fullName.trim() || !username.trim() || !contactNo.trim()) {
      return res.status(400).json({
        message: "Name, username and contact number cannot be empty",
      });
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // Validate password length and reject whitespace-only passwords
    if (password.length < 6 || !password.trim()) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Only allow customer/provider registration; default to customer if no role is provided
    const allowedRoles = ["customer", "provider"];
    let userRole = "customer";

    if (role !== undefined && role !== null && role !== "") {
      if (
        typeof role !== "string" ||
        !allowedRoles.includes(role.trim().toLowerCase())
      ) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }
      userRole = role.trim().toLowerCase();
    }

    // Require NIC details for service providers
    if (userRole === "provider") {
      if (
        typeof nicNo !== "string" ||
        !nicNo.trim() ||
        typeof nicPhoto !== "string" ||
        !nicPhoto.trim()
      ) {
        return res.status(400).json({
          message:
            "NIC number and NIC photo are required for service providers",
        });
      }
    }

    const normalizedEmail = trimmedEmail.toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Check whether email already exists
    const existingEmail = await User.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Check whether username already exists
    const existingUsername = await User.findOne({
      username: normalizedUsername,
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "This username is already taken",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      contactNo: contactNo.trim(),
      address: typeof address === "string" ? address.trim() : "",
      city: typeof city === "string" ? city.trim() : "",
      nicNo:
        userRole === "provider"
          ? nicNo.trim()
          : typeof nicNo === "string"
            ? nicNo.trim()
            : "",
      nicPhoto:
        userRole === "provider"
          ? nicPhoto.trim()
          : typeof nicPhoto === "string"
            ? nicPhoto.trim()
            : "",
      profileImage:
        typeof profileImage === "string" ? profileImage.trim() : "",
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
    const { email, password } = req.body || {};

    // Check required fields
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
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
