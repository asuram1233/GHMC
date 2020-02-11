//import express
const exp = require("express");
//import ward Schema
const wards = require("../database/model/wardSchema");

//use express mini object
const wardApi = exp.Router();

//Request Handlers
//get all wards in all circles and zones.

wardApi.get("/allWards", (request, response) => {
  wards
    .find({}, { _id: 0 })
    .exec()
    .then(data => {
      if (data == null) {
        response.json({ message: `Data not found` });
      } else {
        response.json({ message: data });
      }
    })
    .catch(error => {
      response.json({ message: `Error while GET` });
    });
});

//POST request handler to get wards of a specified circle.
wardApi.post("/circle/wards", (request, response) => {
  wards
    .find({ circleId: request.body.circleId }, { _id: 0 })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({ message: `No Data Found` });
      } else {
        response.json({ message: result });
      }
    })
    .catch(err => {
      response.json({ message: `Error While GET, ${err}` });
    });
});

//POST api to find wards by zoneID
wardApi.post("/zone/circle/ward", (request, response) => {
  wards
    .find({ zoneId: request.body.zoneId }, { _id: 0 })
    .exec()
    .then(result => {
      if (result == "") {
        response.json({ message: "No data found" });
      } else {
        response.json({ message: result });
      }
    })
    .catch(err => {
      response.json({ message: `Error While POST ${err}` });
    });
});

module.exports = wardApi;
