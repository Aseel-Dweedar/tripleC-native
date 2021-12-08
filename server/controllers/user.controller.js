"use strict";

const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const crypto = require("crypto");

// // // // // // // global functions // // // //
async function findByUsername(username) {
  return await userModel.findOne({ username });
}

// // // // // // // CRETE // // // // // // //
const creatUser = async (req, res) => {
  try {
    let { username, firstName, lastName, phone, password } = req.body;

    let data = await findByUsername(username);

    if (data) {
      res.send("Username already exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new userModel({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        image: "",
        request: [],
        car: [],
      });
      newUser.save();
      res.send(newUser);
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

// // // // // // // GET // // // // // //
const getUser = async (req, res) => {
  let data = await userModel.find({}).populate("cars requests");
  res.send(data);
};

// // // // // // // Login // // // // // // //

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await findByUsername(username);
    if (!user) return res.send("Cannot find user !");
    if (await bcrypt.compare(password, user.password)) {
      const token = crypto.randomBytes(64).toString("hex");
      console.log(token);
      res.send(token);
    } else {
      res.send("Incorrect password !!");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = { creatUser, getUser, userLogin };
