const express = require("express");
const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
    res.status(200).json({ message: "Get all tasks" });
});

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
