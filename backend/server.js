const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const connectDB = require("./connect/database");
const { errorHandler } = require("./middleware/errorMidleware");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/tasks", require("./routes/taskRoutes"));

// Middleware
app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
);
