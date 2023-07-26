const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const hashedPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });
  if (user) {
    res.status(201).json({ message: "user created" });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@des  login
//@route POST /auth/login
//@access public
const loginContact = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const user = await User.findOne({ email });

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (user && verifyPassword) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.access_token
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@des  current info
//@route GET /auth/current
//@access private
const getInfocontact = AsyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerContact, loginContact, getInfocontact };
