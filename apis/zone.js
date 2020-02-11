//import express
const exp = require("express");
//import bodyParser
const bodyParser = require("body-parser");
//import zone schema
const zone = require("../database/model/zoneSchema");

//use express mini object
const zoneApi = exp.Router();
//use body-parser
zoneApi.use(bodyParser.json());

//Request Handlers
//GET request to see all zones
zoneApi.get("/allZones", (request, response) => {
  zone
    .find({}, { _id: 0 })
    .exec()
    .then(result => {
      if (result == null) {
        response.json({ message: `unable to query all zones` });
      } else {
        response.json({ message: result });
      }
    })
    .catch(error => {
      response.json({ message: `Cannot GET zones` });
    });
});

module.exports = zoneApi;
