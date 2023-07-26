const express = require("express");
const {
  registerContact,
  loginContact,
  getInfocontact,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/verifyToken");

const auth = express.Router();

auth.post("/register", registerContact);

auth.post("/login", loginContact);

auth.get("/current", validateToken, getInfocontact);

module.exports = auth;
