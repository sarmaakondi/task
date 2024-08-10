const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("That email is already registered");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({ _id: user.id, name: user.name, email: user.email });
    } else {
        res.status(401);
        throw new Error("Incorrect credentials");
    }
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user details" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
