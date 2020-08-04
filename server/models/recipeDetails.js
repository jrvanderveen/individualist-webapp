const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

const RecipeSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: false, // TODO: once data is updated switch to true
    },
    recipeId: {
        type: ObjectID,
        required: true,
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
