const { check } = require(`express-validator`);

exports.userSignupValidator = [
  check(`name`).not().isEmpty().withMessage(`name is required`),
  check(`email`).isEmail().withMessage(`email address is invalid`),
  check(`password`)
    .isLength({ min:6})
    .withMessage(`password must be at least 6 characters long`),
];
