const express = require("express");
const { login } = require("../controllers/authController");
const { loginValidation } = require("../validations/authValidation");
const { handleValidationErrors } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);

module.exports = router;

