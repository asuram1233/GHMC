//import mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema

const zoneSchema = new Schema({
  zoneName: { type: String, required: true },
  zoneId: { type: String, required: true }
});

module.exports = mongoose.model("zone", zoneSchema);
