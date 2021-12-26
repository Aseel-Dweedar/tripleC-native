"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const tokenModel = require("./models/token.model");
const { creatRequest, getRequest, deleteRequest } = require("./controllers/request.controller");
const { creatUser, getUser, userLogin } = require("./controllers/user.controller");
const { creatCar, getCar, deleteCar, getOneCar } = require("./controllers/car.controller");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((value) => {
    console.log("WORKING !!");
  })
  .catch((err) => {
    console.log("NOOOOOOOOOOOOO !!");
    console.log(err);
  });

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Hello !!");
});

// // // // // // // User endpoint // // // // // //
app.post("/user", creatUser);
app.post("/user/login", userLogin);
app.get("/user", getUser);
// // // // // // // Authentication middleware // // // // // //
app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    let bearerToken = authHeader.split(" ")[1];
    const userToken = await tokenModel.findOne({ token: bearerToken });
    if (bearerToken === userToken.token) {
      req.user = userToken.user;
      next();
    }
  } else {
    res.sendStatus(401);
  }
});

// // // // // // // Request endpoint // // // // // //
app.post("/request", creatRequest);
app.get("/request", getRequest);
app.delete("/request/:requestId", deleteRequest);

// // // // // // // Car endpoint // // // // // //
app.get("/car", getCar);
app.get("/car/:id", getOneCar);
app.post("/car", creatCar);
app.delete("/car/:carId", deleteCar);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
