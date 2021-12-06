"use strict";

const { carModel } = require("../models/car.model");
const { userModel } = require("../models/user.model");

// // // // // // // CRETE // // // // // //
const creatCar = async(req, res) => {
    let { type, model, gasoline } = req.body;
    let { userId } = req.params;

    let newCar = new carModel({ type, model, gasoline });
    newCar.save();

    console.log({ userId });
    let user = await userModel.findById(userId);
    console.log({ user });
    user.cars.push(newCar);
    await user.save();

    res.send(newCar);
};

// // // // // // // GET // // // // // //
const getCar = (req, res) => {
    carModel.find({}, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send(data);
        }
    });
};

// // // // // // // DELETE // // // // // //
const deleteCar = (req, res) => {
    let { carId } = req.params.carId;
    carModel.deleteOne({ carId }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send("Done");
        }
    });
};

module.exports = { creatCar, getCar, deleteCar };