const express = require("express");
const { login, me, logout } = require("../controllers/authController");
const { loginValidation } = require("../validations/authValidation");
const { handleValidationErrors } = require("../middleware/validationMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);
router.get("/me", protect, me);
router.post("/logout", logout);

module.exports = router;
