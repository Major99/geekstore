const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const activitySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      type: ObjectId,
      ref: "Activity",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
