const mongoose = require("mongoose");

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
        //ingredient = {_id: id, name: "name", grocerySection: "section name"}
        type: Array,
        default: [],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
