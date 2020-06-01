const express = require(`express`);
const router = express.Router();
const { signup, signin, signout ,requireSignin} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators"); // this would get the index.html file in validators folder
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth"); // this would get the index.html file in validators folder

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

//
router.get("/secret",requireSignin, (req, res) => {
  res.send({message: "you have access to the secret page"})
})
module.exports = router;
