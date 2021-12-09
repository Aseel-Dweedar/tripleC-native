"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const tokenModel = require('./models/token.model');

const { creatService, getService, updateService } = require("./controllers/service.controller");
const { creatRequest, getRequest, deleteRequest } = require("./controllers/request.controller");
const { creatUser, getUser, userLogin } = require("./controllers/user.controller");
const { creatCar, getCar, deleteCar } = require("./controllers/car.controller");
const { creatLocation, getLocation, deleteLocation } = require("./controllers/location.controller");

mongoose.connect("mongodb://localhost:27017/car-care", { useNewUrlParser: true }).then((result) => {
  console.log("Working");
}).catch((err) => {
  console.log("NOOOOOOOOO !!");
  console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Hello !!");
});

app.get('/tokens', async (req, res) => {
  let data = await tokenModel.find({});
  res.send(data);
});

app.delete('/tokens/delete', async (req, res) => {
  await tokenModel.deleteMany({});
  res.send("done");
});

// // // // // // // User endpoint // // // // // //
app.post("/user", creatUser);
app.post("/user/login", userLogin);

// // // // // // // Authentication middleware // // // // // //
app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== 'undefined') {
    console.log("authHeader === ", authHeader);
    // console.log(" type of authHeader === ", typeof authHeader);
    // const bearerToken = authHeader.split(" ")[1];
    // console.log("bearerToken === ", bearerToken);
    const userToken = await tokenModel.findOne({ userID: req.body._id });
    console.log("userToken === ", userToken.token);
    jwt.verify(authHeader, userToken.token, (err, data) => {
      console.log(data);
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/user", getUser);

// // // // // // // Service endpoint // // // // // //
app.post("/service", creatService);
app.get("/service", getService);
app.put("/service/:serviceId", updateService);

// // // // // // // Request endpoint // // // // // //
app.post("/request/:userId", creatRequest);
app.get("/request", getRequest);
app.delete("/request/:requestId", deleteRequest);

// // // // // // // Car endpoint // // // // // //
app.post("/car/:userId", creatCar);
app.get("/car", getCar);
app.delete("/car/:carId", deleteCar);

// // // // // // // Location endpoint // // // // // //
app.post("/location", creatLocation);
app.get("/location", getLocation);
app.delete("/location/:locationId", deleteLocation);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});