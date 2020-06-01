const express = require(`express`);
const router = express.Router();
const { signup } = require("../controllers/auth");

// validators
const { runValidation } = require("../validators"); // this would get the index.html file in validators folder
const { userSignupValidator } = require("../validators/auth"); // this would get the index.html file in validators folder

router.post("/signup", userSignupValidator, runValidation, signup);

module.exports = router;
