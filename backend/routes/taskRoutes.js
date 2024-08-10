const express = require("express");
const router = express.Router();

// Index route
router.get("/", (req, res) => {
    res.status(200).json({ message: "Get all tasks" });
});

module.exports = router;
