const User = require("../models/User");
const GrocerySections = require("../models/GrocerySections");
const ShoppingList = require("../models/ShoppingList");
const Recipe = require("../models/Recipe");
const fs = require("fs");

// @desc On app start determine if user is authenticated
// @route GET /api/v1.1/login/state
// @access Public
exports.userState = async (req, res, next) => {
    const loggedIn = req.isAuthenticated();
    const username = loggedIn ? req.user.username : "";
    try {
        return res.status(200).json({
            success: loggedIn,
            username: username,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Sign user up for site and store session
// @route GET /api/v1.1/login/signUp
// @access Public
exports.signUp = async (req, res, next) => {
    console.log("Sign Up");
    const { username, email, password, repeatPassword } = req.body;
    console.log(username, email, password, repeatPassword);
    User.findOne({ username: username }).then((user) => {
        if (user) {
            return res.status(200).json({
                success: false,
                error: `Sorry, already a user with the username: ${username}`,
            });
        } else {
            const newUser = new User({
                username: username,
                email: email,
                authType: "local",
                password: password,
            });
            console.log(newUser);
            newUser.save((err, savedUser) => {
                console.log(err);
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: `Server Error`,
                    });
                }
                setUserDefaults(savedUser._id);
                res.json(savedUser);
            });
        }
    });
};

// Helper method to create default user documents
exports.setUserDefaults = (userId) => {
    console.log("Set up new user");
    try {
        jsonReader("./controlers/data/SignUpGrocerySections.json", (err, grocerySections) => {
            if (err) {
                console.log(err);
                return;
            }
            grocerySections["userId"] = userId;
            GrocerySections.create(grocerySections);
        });

        jsonReader("./controlers/data/SignUpShoppinglist.json", (err, shoppingList) => {
            if (err) {
                console.log(err);
                return;
            }
            shoppingList["userId"] = userId;
            ShoppingList.create(shoppingList);
        });

        jsonReader("./controlers/data/SignUpRecipes.json", (err, recipes) => {
            if (err) {
                console.log(err);
                return;
            }
            recipes.forEach((recipe) => {
                recipe["userId"] = userId;
            });
            Recipe.insertMany(recipes);
        });
    } catch (err) {
        console.log(`ERROR: Creating user default documents`.red);
    }
};

//Read File Helper
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

// @desc Sign user into MongoStore and create passport session cookie
// @route GET /api/v1.1/login/signIn
// @access Public
exports.signIn = async (req, res, next) => {
    res.send({
        username: req.user.username,
        success: true,
    });
};

// @desc Sign user out
// @route GET /api/v1.1/login/signOut
// @access Public
exports.signOut = async (req, res, next) => {
    console.log("Sign Out");
    if (req.user) {
        req.logout();
        res.send({ msg: "logging out" });
    } else {
        res.send({ msg: "no user to log out" });
    }
};

// @desc Sign user in with google auth
// @route GET /api/v1.1/login/signIn/google
// @access Public
exports.signInGoogleRedirect = async (req, res, next) => {
    res.redirect(process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000");
};
