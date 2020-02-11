//import mongoose
const mongoose = require("mongoose");

//mongo DB Url
const dbUrl =
  "mongodb+srv://asuram:asuram@cluster0-nue8g.mongodb.net/GHMC?retryWrites=true&w=majority";

//connect to mongoDB using mongoose.connect method
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//Specify connection status by using mongoose connection function

const connection = mongoose.connection;

//connection status
connection.on("connected", () => {
  console.log(`You are connected to mongoDB`);
});

connection.on("disconnect", () => {
  console.log(`You are disconnected from mongoDB`);
});

connection.on("error", () => {
  console.log(`Error while connecting to mongoDB`);
});
