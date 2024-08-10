const asyncHandler = require("express-async-handler");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "User registered successfully" });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "User login successful" });
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Currest user details" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
