"use strict";

const { carModel } = require("../models/car.model");

const getUserCar = (res, user) => {
  carModel.find({ user, deleted: false }, (error, data) => {
    if (error) {
      res.send(error.message);
    } else {
      res.send(data);
    }
  });
};

// // // // // // // CRETE // // // // // //
const creatCar = async (req, res) => {
  let { type, model, gasoline } = req.body;
  let user = req.user;
  let newCar = new carModel({ type, model, gasoline, deleted: false });
  newCar.user = user;
  await newCar.save();
  res.send(newCar);
};

// // // // // // // GET // // // // // //
const getCar = (req, res) => {
  let user = req.user;
  getUserCar(res, user);
};

// // // // // // // DELETE // // // // // //
const deleteCar = async (req, res) => {
  let carId = req.params.carId;
  let user = req.user;
  carModel.findOneAndUpdate({ _id: carId }, { deleted: true }, { new: true }, (error, data) => {
    if (error) {
      res.send(error.message);
    } else {
      getUserCar(res, user);
    }
  });
};

module.exports = { creatCar, getCar, deleteCar };
