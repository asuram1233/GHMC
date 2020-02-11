//import Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create Schema

const userSchema = new Schema({
  userName: { type: String, required: true },
  userRole: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: Number, required: true },
  userPassword: { type: String, required: true },
  userImgUrl: { type: String },
  userAddress: { type: String }
});

module.exports = mongoose.model("users", userSchema);
