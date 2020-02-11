//import express
const exp = require("express");
//import jsonwebtoken
const jwt = require("jsonwebtoken");
//import users Schema
const users = require("../database/model/userSchema");
//import bodyParser
const bodyParser = require("body-parser");
//import bcrypt
const bcrypt = require("bcrypt");
//use the express mini
const loginApi = exp.Router();
//use body-parser
loginApi.use(bodyParser.json());

//Request handlers
//below API is for superuser , zonal commissioner, Deputy commissioner
loginApi.post("/login", (request, response) => {
  users
    .findOne({ userEmail: request.body.userEmail })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({
          message: `User with doesn't exist; Contact Super Admin `
        });
      } else {
        let userRole = result.userRole;
        let userName = result.userName;
        bcrypt.compare(
          request.body.userPassword,
          result.userPassword,
          (error, result) => {
            if (error) {
              console.log(error);
            } else if (result == true) {
              jwt.sign(
                { userName: result.userName },
                "Powered By Vixspace",
                (err, token) => {
                  if (err) {
                    console.log(err);
                  } else {
                    response.json({
                      message: "your login is successful",
                      token: token,
                      userName,
                      userRole
                    });
                  }
                }
              );
            } else {
              response.json({ message: "Please enter valid password" });
            }
          }
        );
      }
    })
    .catch(error => {
      response.json({ message: `Error while login ${error}` });
    });
});

//Bellow Api is for all other users like Health Officers, Sanitary Inspector, Supervisors, Garbage Collectors(g-collector)

loginApi.post("/otherUsers/login/:user", (request, response) => {
  users
    .findOne({
      $and: [
        { userRole: request.params.user },
        { userEmail: request.body.userEmail }
      ]
    })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({ message: `User not found, Please contact Admin` });
      } else {
        let userName = result.userName;
        let userRole = result.userRole;
        bcrypt.compare(
          request.body.userPassword,
          result.userPassword,
          (error, result) => {
            if (error) {
              response.json({ message: `${error}` });
            } else if (result == true) {
              jwt.sign(
                { userName: result.userName },
                "Powered By Vixspace",
                (err, token) => {
                  if (err) {
                    response.json({ message: `Invalid User` });
                  } else {
                    response.json({
                      message: `Your login is successful`,
                      token: token,
                      userName,
                      userRole
                    });
                  }
                }
              );
            } else {
              response.json({ message: `Please enter valid password` });
            }
          }
        );
      }
    })
    .catch(error => {
      response.json({ message: `Error while login ${error}` });
    });
});

module.exports = loginApi;
