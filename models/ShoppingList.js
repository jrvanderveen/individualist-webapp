const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema({
    grocerySectionIngredientsMap: mongoose.Schema.Types.Mixed, //{grocerySectionName: [ingredient list]}
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
