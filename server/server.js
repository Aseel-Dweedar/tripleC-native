"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

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

// // // // // // // User endpoint // // // // // //
app.post("/user", creatUser);
app.get("/user", getUser);
app.post("/user/login", userLogin);

// // // // // // // Authentication middleware // // // // // //
// app.use((req, res, next) => {
//   const authHeader = req.header["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) res.sendStatus(401);
// });

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
