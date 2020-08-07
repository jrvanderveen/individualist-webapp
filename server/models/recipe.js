const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

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

const RecipeDetailSchema = new mongoose.Schema({
    prepTime: {
        type: Number,
        default: 0,
    },
    cookTime: {
        type: Number,
        default: 0,
    },
    dificulty: {
        type: String,
        default: "Medium",
    },
    notes: {
        type: Array,
        default: [],
    },
    Instructions: {
        type: String,
        default: "",
    },
    images: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const RecipeSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: false, // TODO: once data is updated switch to true
    },
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
    rating: {
        type: Number,
        default: 1,
    },
    ingredients: {
        type: [IngredientSchema],
        default: [],
        required: false,
    },
    recipeDetails: {
        type: RecipeDetailSchema,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
