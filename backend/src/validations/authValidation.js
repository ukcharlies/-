const { body } = require("express-validator");

const loginValidation = [
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

module.exports = {
  loginValidation
};

