const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    user: req.user._id,
    title: req.body.title,
    status: "Pending"
  });

  return res.status(201).json(task);
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = req.body.status;
  await task.save();

  return res.status(200).json(task);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};

