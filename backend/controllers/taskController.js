const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const { default: mongoose } = require("mongoose");

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// Create task
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Task cannot be empty!");
    }

    const task = await Task.create({ text: req.body.text });
    res.status(200).json(task);
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Task not found");
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedTask);
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Task not found");
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
