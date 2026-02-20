const { body, param } = require("express-validator");

const taskIdValidation = [
  param("id").isMongoId().withMessage("Invalid task id")
];

const createTaskValidation = [
  body("title")
    .isString()
    .withMessage("Title is required")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters")
];

const updateTaskValidation = [
  ...taskIdValidation,
  body("status")
    .isString()
    .withMessage("Status is required")
    .isIn(["Pending", "Completed"])
    .withMessage("Status must be either Pending or Completed")
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation
};

