const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
const ShoppingListSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: false, // TODO: once data is updated switch to true
    },
    grocerySectionIngredientsMap: mongoose.Schema.Types.Mixed, //{grocerySectionName: [ingredient list]}
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
