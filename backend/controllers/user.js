const User = require("../models/user");

//profile of a user
exports.profile = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.send(req.profile);
};


