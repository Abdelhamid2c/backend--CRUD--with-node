const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@des  register
//@route POST /auth/register
//@access public
const registerContact = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  res.json({ message: "registre the user" });
});

//@des  login
//@route POST /auth/login
//@access public
const loginContact = AsyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});

//@des  current info
//@route GET /auth/current
//@access private
const getInfocontact = AsyncHandler(async (req, res) => {
  res.json({ message: "current user info" });
});

module.exports = { registerContact, loginContact, getInfocontact };
