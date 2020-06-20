const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grocerySection: {
        type: String,
        required: true,
    },
});

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    servings: {
        type: Number,
        default: 1,
    },
    URL: {
        type: String,
        default: "",
    },
    ingredients: {
        type: [IngredientSchema],
        default: [],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
