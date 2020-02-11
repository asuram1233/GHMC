//import mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create Schema for Wards

const wardSchema = new Schema({
  wardId: { type: String, required: true },
  wardName: { type: String, required: true },
  wardNum: { type: Number, required: true },
  circleId: { type: String, required: true },
  zoneId: { type: String, required: true }
});

module.exports = mongoose.model("ward", wardSchema);
