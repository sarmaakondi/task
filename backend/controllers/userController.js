const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Helper function to handle errors
const handleErrorResponse = (res, statusCode, message) => {
    res.status(statusCode);
    throw new Error(message);
};

// Genereate JWT token
const generateJWTToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment");
    }
    return jwt.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRATION || "3d",
    });
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return handleErrorResponse(res, 400, "All fields are mandatory");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return handleErrorResponse(
            res,
            400,
            "That email is already registered"
        );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTToken(user.id),
        });
    } else {
        return handleErrorResponse(res, 400, "Invalid user data");
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTToken(user.id),
        });
    } else {
        return handleErrorResponse(res, 400, "Incorrect credentials");
    }
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user details" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
