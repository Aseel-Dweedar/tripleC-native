"use strict";

const { serviceModel } = require("../models/service.model");

// // // // // // // CRETE // // // // // //
const creatService = (req, res) => {
    let { name } = req.body;
    serviceModel.findOne({ name: name }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else if (data) {
            res.send("Already exist");
        } else {
            let newService = new serviceModel({ name: name, request: [] });
            newService.save();
            res.send(newService);
        }
    });
};

// // // // // // // GET // // // // // //
const getService = (req, res) => {
    serviceModel.find({}, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send(data);
        }
    });
};

// // // // // // // Update // // // // // //
const updateService = (req, res) => {
    let serviceId = req.params.serviceId;
    let newRequest = req.body;
    serviceModel.findOne({ _id: serviceId }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            data.request.push(newRequest);
            data.save();
            res.send(data);
        }
    });
};

module.exports = { creatService, getService, updateService };