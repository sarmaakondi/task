// Get all tasks
const getTasks = (req, res) => {
    res.status(200).json({ message: "Get all tasks" });
};

// Create task
const setTask = (req, res) => {
    res.status(200).json({ message: "Task created." });
};

// Update task
const updateTask = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
};

// Delete task
const deleteTask = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
};

module.exports = { getTasks, setTask, updateTask, deleteTask };
