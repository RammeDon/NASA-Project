const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightnumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: [string],
  upcoming: {
    type: boolean,
    required: true,
  },
  success: {
    type: boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Launch", launchesSchema);
