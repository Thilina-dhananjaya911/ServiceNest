const express = require("express");
const {
  saveProvider,
  removeSavedProvider,
} = require("../controllers/customerProfileController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/:providerId", protect, authorize("customer"), saveProvider);
router.delete("/:providerId", protect, authorize("customer"), removeSavedProvider);

module.exports = router;