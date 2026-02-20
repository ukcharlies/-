const express = require("express");
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { handleValidationErrors } = require("../middleware/validationMiddleware");
const {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation
} = require("../validations/taskValidation");

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTaskValidation, handleValidationErrors, createTask);
router.patch("/:id", updateTaskValidation, handleValidationErrors, updateTaskStatus);
router.delete("/:id", taskIdValidation, handleValidationErrors, deleteTask);

module.exports = router;

