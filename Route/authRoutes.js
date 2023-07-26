const express = require("express");
const {
  registerContact,
  loginContact,
  getInfocontact,
} = require("../controllers/userControllers");
const auth = express.Router();

auth.route("/register").post(registerContact);

auth.route("/login").post(loginContact);

auth.route("/current").get(getInfocontact);

module.exports = auth;
