"use strict";

const { userModel } = require("../models/user.model");

// // // // // // // CRETE // // // // // //
const creatUser = (req, res) => {
    let { name } = req.body;
    userModel.findOne({ name: name }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else if (data) {
            res.send("Already exist");
        } else {
            let newUser = new userModel({...req.body, request: [], car: [] });
            newUser.save();
            res.send(newUser);
        }
    });
};

// // // // // // // GET // // // // // //
const getUser = async(req, res) => {
    let data = await userModel.find({}).populate("cars requests");
    res.send(data);
};

module.exports = { creatUser, getUser };