const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add some text"],
    },
    servings: {
        type: Number,
        required: [true, "Please add a positive number"],
    },
    URL: {
        type: String,
        required: [false, ""],
    },
    ingredients: {
        type: Array,
        required: [true, "System error"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
