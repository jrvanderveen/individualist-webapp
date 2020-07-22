const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;

const GrocerySectionsSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: false, // TODO: once data is updated switch to true
    },
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
