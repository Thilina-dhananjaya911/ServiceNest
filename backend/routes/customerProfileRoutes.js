const express = require("express");
const multer = require("multer");
const {
  getCustomerProfile,
  updateCustomerProfile,
  changeCustomerPassword,
  updateCustomerAvatar,
} = require("../controllers/customerProfileController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG or WEBP images are allowed"));
    }
  },
});

router.get("/", protect, authorize("customer"), getCustomerProfile);
router.put("/", protect, authorize("customer"), updateCustomerProfile);
router.put("/password", protect, authorize("customer"), changeCustomerPassword);

router.put(
  "/avatar",
  protect,
  authorize("customer"),
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message:
            err.code === "LIMIT_FILE_SIZE"
              ? "Image must be under 5MB"
              : err.message,
        });
      }
      next();
    });
  },
  updateCustomerAvatar
);

module.exports = router;