const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Text cannot be empty"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
