const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Text cannot be empty"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
