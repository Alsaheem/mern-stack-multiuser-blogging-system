const User = require("../models/user");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


//sign up a user
exports.signup = (req, res) => {
  //check if the email has been registered to a user
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).send({ error: "Email is taken" });
    }
    const { name, email, password } = req.body;
    let username = shortid.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, username, password, profile });
    newUser.save((error, success) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ error: error });
      }
      res.status(201).send({
        message: "Signup successful , please sign in",
        user: newUser,
      });
    });
  });
};

// sign in a user
exports.signin = (req, res) => {
  //get values of the request
  const { email, password } = req.body;
  //cheeck if user exists
  User.findOne({ email }).exec((error, user) => {
    if (error || !user) {
      return res
        .status(400)
        .send({ error: "user with that email does not exist , please Signup" });
    }
    //authenticate
    if (!user.authenticate) {
      return res.status(400).send("email and password does not match");
    }
    //generate a token and send  to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, email, role, name } = user;
    res.send({
      user: { _id, username, name, email, role },
      token,
      message: "Signin successful ",
    });
  });
};

// sign out a user
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Signout successful" });
};

// require signin
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).send({ error: "user not found" });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).send({ error: "user not found" });
    }
    if (user.role !== 1) {
      return res.status(400).send({ error: "Admin resource..access denined" });
    }
    req.profile = user;
    next();
  });
};
