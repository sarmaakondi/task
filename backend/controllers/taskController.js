const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// Create task
const setTask = asyncHandler((req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Task cannot be empty!");
    }
    res.status(200).json({ message: "Task created." });
});

// Update task
const updateTask = asyncHandler((req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
});

// Delete task
const deleteTask = asyncHandler((req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
