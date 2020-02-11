//import mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema

const circleSchema = new Schema({
  circleName: { type: String, required: true },
  circleId: { type: String, required: true },
  zoneId: { type: String, required: true },
  zoneName: { type: String, required: true }
});

module.exports = mongoose.model("circle", circleSchema);
