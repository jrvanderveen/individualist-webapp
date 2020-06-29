// Dependencies
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const mongoUtil = require("./config/db");

// Set env path
dotenv.config({ path: "./config/config.env" });

// DB Connect
mongoUtil.connectDB(process.env.MONGO_URI, function (err, client) {
    if (err) console.log(err);

    // Express
    const app = express();

    app.use(express.json());
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    app.use(express.urlencoded({ extended: true }));
    // Express Session
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            store: new MongoStore({ mongooseConnection: mongoUtil.getConnection() }),
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport Middleware
    if (process.env.LOGING_LEVEL === "verbose") {
        app.use((req, res, next) => {
            console.log("req.session", req.session);
            return next();
        });
    }

    // Routes
    const recipes = require("./routes/recipes");
    const shoppingList = require("./routes/ShoppingList");
    const settings = require("./routes/Settings");
    const login = require("./routes/Login");

    // Direct Routes
    app.use("/api/v1.1/recipes", recipes);
    app.use("/api/v1.1/shoppingList", shoppingList);
    app.use("/api/v1.1/settings", settings);
    app.use("/api/v1.1/login", login);

    // If production build serve index.html from static path on startup
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
    }

    // Set server listening port
    const PORT = process.env.PORT || 50001;
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
});
