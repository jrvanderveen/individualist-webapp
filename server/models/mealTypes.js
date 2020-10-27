const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

const MealTypesSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: false, // TODO: once data is updated switch to true
    },
    default: {
        type: String,
        default: "Other",
    },
    types: {
        type: Array,
        default: ["Other"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MealTypes", MealTypesSchema);
