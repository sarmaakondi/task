const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
});

// Create task
const setTask = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400);
        throw new Error("Task text cannot be empty!");
    }

    const task = await Task.create({ text, user: req.user.id });
    res.status(201).json(task);
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404);
        throw new Error("Task not found");
    }

    const task = await Task.findById(id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    if (task.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User is not authorized to update this task");
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updatedTask) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json(updatedTask);
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404);
        throw new Error("Task not found");
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json({ id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
