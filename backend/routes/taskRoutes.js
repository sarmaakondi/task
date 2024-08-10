const express = require("express");
const router = express.Router();
const { getTasks } = require("../controllers/taskController");

// Get all tasks
router.get("/", getTasks);

// Create task
router.post("/", (req, res) => {
    res.status(200).json({ message: "Task created." });
});

// Update task
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
});

// Delete task
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
});

module.exports = router;
