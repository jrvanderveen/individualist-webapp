// Dependencies
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Set env path
dotenv.config({ path: "./config/config.env" });

// DB Set up
const connectDB = require("./config/db");
connectDB(process.env.MONGO_URI);

// APP
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
const recipes = require("./routes/recipes");
const shoppingList = require("./routes/ShoppingList");
const settings = require("./routes/Settings");
// Direct Routes
app.use("/api/v1/recipes", recipes);
app.use("/api/v1/shoppingList", shoppingList);
app.use("/api/v1/settings", settings);

// If production build serve index.html from static path on startup
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

// Set server listening port
const PORT = process.env.PORT || 50001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
