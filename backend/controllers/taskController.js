// Get all tasks
const getTasks = (req, res) => {
    res.status(200).json({ message: "Get all tasks" });
};

module.exports = { getTasks };
