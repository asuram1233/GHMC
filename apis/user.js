//import express
const exp = require("express");
//import user Schema
const users = require("../database/model/userSchema");
//import bodyParser
const bodyParser = require("body-parser");
//import bcrypt
const bcrypt = require("bcrypt");

//create express mini object
const userApi = exp.Router();
//use body-parser
userApi.use(bodyParser.json());

//Request Handlers
//POST request handler for super user to add all users based on role
userApi.post("/register", (request, response) => {
  users
    .findOne({
      $and: [
        { userName: request.body.userName },
        { userRole: request.body.userRole }
      ]
    })
    .exec()
    .then(result => {
      if (result == null) {
        bcrypt.hash(request.body.userPassword, 10, (error, hashPassword) => {
          if (error) {
            console.log(error);
          } else {
            request.body.userPassword = hashPassword;
            let userObj = new users({
              userName: request.body.userName,
              userRole: request.body.userRole,
              userEmail: request.body.userEmail,
              userPhone: request.body.userPhone,
              userPassword: request.body.userPassword,
              userImgUrl: request.body.userImgUrl,
              userAddress: request.body.userAddress
            });
            userObj
              .save()
              .then(() => {
                response.json({
                  data: `user with username : ${request.body.userName} and with role: ${request.body.userRole} is registered successfully`
                });
              })
              .catch(error => {
                response.json({ message: `Error while insert ${error}` });
              });
          }
        });
      } else {
        response.json({
          message: `User with defined role and username already exist`
        });
      }
    })
    .catch(err => {
      console.log(`API Error `, err);
    });
});

//PUT Request handler for super user to update user role information
userApi.put("/update/info/:userName", (request, response) => {
  users
    .findOne({
      //   $and: [
      //     { userName: request.params.userName },
      //     { userRole: request.body.userRole },
      //     { userEmail: request.body.userEmail }
      //   ]
      userName: request.params.userName
    })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({
          message: `user with ${request.params.userName} doesn't exist`
        });
      } else {
        users
          .updateOne(
            { userName: request.params.userName },
            {
              $set: {
                userRole: request.body.userRole,
                userEmail: request.body.userEmail,
                userPhone: request.body.userPhone,
                userImgUrl: request.body.userImgUrl,
                userAddress: request.body.userAddress
              }
            }
          )
          .exec()
          .then(() => {
            response.json({
              message: `user with ${request.params.userName} updated successfully`
            });
          })
          .catch(error => {
            response.json({ message: `Unable to update profile` });
          });
      }
    })
    .catch(error => {
      response.json({ message: `Error While update ${error}` });
    });
});

//Request Handler to reset password
//PUT request handler
userApi.put("/update/password", (request, response) => {
  users
    .findOne({ userName: request.body.userName })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({
          message: `User with username ${request.body.userName} not found to update`
        });
      } else {
        bcrypt.hash(request.body.userPassword, 10, (err, hashPswd) => {
          if (err) {
            console.log(err);
          } else {
            request.body.userPassword = hashPswd;
            users
              .updateOne(
                { userName: request.body.userName },
                { $set: { userPassword: request.body.userPassword } }
              )
              .exec()
              .then(() => {
                response.json({
                  message: `Password for user ${request.body.userName} updated successfully`
                });
              })
              .catch(error => {
                response.json({
                  message: `Cannot update password for user ${request.body.userName}`
                });
              });
          }
        });
      }
    })
    .catch(error => {
      response.json({ message: `Error while password reset ${error}` });
    });
});

module.exports = userApi;
