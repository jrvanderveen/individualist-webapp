const mongoose = require("mongoose");

const GrocerySectionsSchema = new mongoose.Schema({
    default: {
        type: String,
        default: "Other",
    },
    sections: {
        type: Array,
        default: ["Other"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("GrocerySections", GrocerySectionsSchema);
