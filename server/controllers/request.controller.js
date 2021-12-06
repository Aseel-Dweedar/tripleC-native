"use strict";

const { requestModel } = require("../models/request.model");
const { userModel } = require("../models/user.model");

// // // // // // // CRETE // // // // // //
const creatRequest = async(req, res) => {
    let { name, description, phone, isTaken, car, location } = req.body;
    let { userId } = req.params;
    let newRequest = new requestModel({ user: userId, name, description, phone, isTaken, car, location });
    await newRequest.save();

    let user = await userModel.findById(userId);
    user.requests.push(newRequest);
    await user.save();
    res.send(newRequest);
};

// // // // // // // GET // // // // // //
const getRequest = async(req, res) => {
    let data = await requestModel.find({}).populate("location car");
    res.send(data);
};

// // // // // // // DELETE // // // // // //
const deleteRequest = (req, res) => {
    let { requestId } = req.params.requestId;
    requestModel.deleteOne({ requestId }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send("Done");
        }
    });
};

module.exports = { creatRequest, getRequest, deleteRequest };