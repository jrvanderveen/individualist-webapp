// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

// Routes
const recipies = require("./routes/recipies");

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use("/api/v1/recipies", recipies);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
