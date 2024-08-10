const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Routes
app.get("/api/tasks", (req, res) => {
    res.send("Get all tasks");
});

app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
);
