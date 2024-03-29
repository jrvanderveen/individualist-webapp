const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const MealTypesSchema = new mongoose.Schema({
    default: {
        type: String,
        default: "Other",
    },
    types: {
        type: Array,
        default: ["Other"],
    },
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    authId: {
        type: String,
        required: false,
    },
    authType: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    mealTypes: {
        type: MealTypesSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define schema methods
UserSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
    },
};

// Define hooks for pre-saving
UserSchema.pre("save", function (next) {
    if (!this.password) {
        if (process.env.LOGGING_LEVEL === "verbose") {
            console.log("models/user.js =======NO PASSWORD PROVIDED=======");
        }
        next();
    } else {
        if (process.env.LOGGING_LEVEL === "verbose") {
            console.log("models/user.js hashPassword in pre save");
        }
        this.password = this.hashPassword(this.password);
        next();
    }
});

module.exports = mongoose.model("User", UserSchema);
