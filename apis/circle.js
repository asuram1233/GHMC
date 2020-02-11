//import express
const exp = require("express");
//import body-parser
const bodyParser = require("body-parser");
//import circle schema
const circles = require("../database/model/circleSchema");

//use express mini object
const circleApi = exp.Router();
//use body-parser
circleApi.use(bodyParser.json());

//Request handlers
//Get Request handlers to get all circle information
circleApi.get("/allCircles", (request, response) => {
  circles
    .find({}, { _id: 0 })
    .exec()
    .then(data => {
      if (data == null) {
        response.json({ data: `No data found` });
      } else {
        response.json({ data: data });
      }
    })
    .catch(error => {
      response.json({ data: `Error while GET ${error}` });
    });
});

// POST Req Handler to make a Get request to get all circles of given zone

circleApi.post("/zone/allCircles", (request, response) => {
  circles
    .find({ zoneId: request.body.zoneId }, { _id: 0 })
    .exec()
    .then(data => {
      if (data == null) {
        response.json({ data: `No data found` });
      } else {
        response.json({ data: data });
      }
    })
    .catch(error => {
      response.json({ data: `Error While GET ${error}` });
    });
});

module.exports = circleApi;
