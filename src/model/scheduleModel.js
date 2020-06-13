const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
  },
  session: {
    type: Number,
  },
  time: {
    type: String,
  },
  tracks: {
    type: [Object],
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
