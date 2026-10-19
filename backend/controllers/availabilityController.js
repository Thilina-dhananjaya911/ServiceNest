const Availability = require("../models/Availability");

// Create or update availability for a day
const createAvailability = async (req, res) => {
  try {
    const {
      dayOfWeek,
      startTime,
      endTime,
      isAvailable,
    } = req.body;

    const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

if (!dayOfWeek || !startTime || !endTime) {
  return res.status(400).json({
    message: "Day, start time and end time are required",
  });
}

if (!validDays.includes(dayOfWeek)) {
  return res.status(400).json({
    message:
      "Invalid day. Use Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday",
  });
}

if (
  isAvailable !== undefined &&
  typeof isAvailable !== "boolean"
) {
  return res.status(400).json({
    message: "isAvailable must be a boolean",
  });
}

    // Basic time validation
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
      return res.status(400).json({
        message: "Time must be in HH:mm format",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "End time must be later than start time",
      });
    }

    const availability = await Availability.findOneAndUpdate(
      {
        providerId: req.user._id,
        dayOfWeek,
      },
      {
        providerId: req.user._id,
        dayOfWeek,
        startTime,
        endTime,
        isAvailable:
          isAvailable !== undefined ? isAvailable : true,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Availability saved successfully",
      availability,
    });
  } catch (error) {
    console.error("Create availability error:", error);

    res.status(500).json({
      message: "Server error while saving availability",
    });
  }
};


// Get logged-in provider's availability
const getMyAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({
      providerId: req.user._id,
    }).sort({ dayOfWeek: 1 });

    res.status(200).json({
      message: "Availability retrieved successfully",
      count: availability.length,
      availability,
    });
  } catch (error) {
    console.error("Get availability error:", error);

    res.status(500).json({
      message: "Server error while retrieving availability",
    });
  }
};


// Get a provider's availability
const getProviderAvailability = async (req, res) => {
  try {
    const { providerId } = req.params;

    const availability = await Availability.find({
      providerId,
      isAvailable: true,
    }).sort({ dayOfWeek: 1 });

    res.status(200).json({
      message: "Provider availability retrieved successfully",
      count: availability.length,
      availability,
    });
  } catch (error) {
    console.error("Get provider availability error:", error);

    res.status(500).json({
      message: "Server error while retrieving provider availability",
    });
  }
};


// Update availability
const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      startTime,
      endTime,
      isAvailable,
    } = req.body;

    const availability = await Availability.findOne({
      _id: id,
      providerId: req.user._id,
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability record not found",
      });
    }

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (startTime !== undefined) {
      if (!timePattern.test(startTime)) {
        return res.status(400).json({
          message: "Start time must be in HH:mm format",
        });
      }

      availability.startTime = startTime;
    }

    if (endTime !== undefined) {
      if (!timePattern.test(endTime)) {
        return res.status(400).json({
          message: "End time must be in HH:mm format",
        });
      }

      availability.endTime = endTime;
    }

    if (
      availability.startTime >= availability.endTime
    ) {
      return res.status(400).json({
        message: "End time must be later than start time",
      });
    }

    if (isAvailable !== undefined) {
  if (typeof isAvailable !== "boolean") {
    return res.status(400).json({
      message: "isAvailable must be a boolean",
    });
  }

  availability.isAvailable = isAvailable;
}
    const updatedAvailability = await availability.save();

    res.status(200).json({
      message: "Availability updated successfully",
      availability: updatedAvailability,
    });
  } catch (error) {
    console.error("Update availability error:", error);

    res.status(500).json({
      message: "Server error while updating availability",
    });
  }
};


// Delete availability
const deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      _id: req.params.id,
      providerId: req.user._id,
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability record not found",
      });
    }

    await availability.deleteOne();

    res.status(200).json({
      message: "Availability deleted successfully",
    });
  } catch (error) {
    console.error("Delete availability error:", error);

    res.status(500).json({
      message: "Server error while deleting availability",
    });
  }
};


module.exports = {
  createAvailability,
  getMyAvailability,
  getProviderAvailability,
  updateAvailability,
  deleteAvailability,
};