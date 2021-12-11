"use strict";

const { requestModel } = require("../models/request.model");

const getUserRequests = (res, user) => {
  requestModel.find({ user, deleted: false }, (error, data) => {
    if (error) {
      res.send(error.message);
    } else {
      res.send(data);
    }
  });
};

// // // // // // // CRETE // // // // // //
const creatRequest = async (req, res) => {
  let { name, description, phone, car, location } = req.body;
  let user = req.user;
  let newRequest = new requestModel({ name, description, phone, isTaken: false, car: car, location, deleted: false });
  newRequest.user = user;
  newRequest.car = car;
  await newRequest.save();
  res.send(newRequest);
};

// // // // // // // GET // // // // // //
const getRequest = (req, res) => {
  let user = req.user;
  getUserRequests(res, user);
};

// // // // // // // DELETE // // // // // //
const deleteRequest = (req, res) => {
  let requestId = req.params.requestId;
  let user = req.user;
  requestModel.findOneAndUpdate({ _id: requestId }, { deleted: true }, { new: true }, (error, data) => {
    if (error) {
      res.send(error.message);
    } else {
      getUserRequests(res, user);
    }
  });
};

module.exports = { creatRequest, getRequest, deleteRequest };
