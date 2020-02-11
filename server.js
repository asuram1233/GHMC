//import express
const exp = require("express");
//import database connection
const dbConnect = require("./database/dbConnect");
//import usersApi
const users = require("./apis/user");
//import login api
const login = require("./apis/login");
//import zone Api
const zone = require("./apis/zone");
//import circles api
const circle = require("./apis/circle");
//import ward Api
const ward = require("./apis/ward");

//use the express function
const app = exp();

//use login api
app.use(login);

//use userApi
app.use("/user", users);

//use zoneApi
app.use(zone);

//use circle Api
app.use(circle);

//use ward api
app.use(ward);

//assign a port and listen
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`You are listening on ${PORT}`);
});
