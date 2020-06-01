const User = require("../models/user");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//sign up a user
exports.signup = (req, res) => {
  //
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).send({ error: "Email is taken" });
    }
    const { name, email, password } = req.body;
    let username = shortid.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, username, password, profile });
    newUser.save((err, success) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ err: err });
      }
      res.send({
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
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .send("user with that email does not exist , please Signup");
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
    res.send({ user: { _id, username, name, email, role }, token });
  });
};

// sign out a user
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Signout successful" });
};


// require signin
exports.requireSignin = expressJwt({
  secret :process.env.JWT_SECRET
})
