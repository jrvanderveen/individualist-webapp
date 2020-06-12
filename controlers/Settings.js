const GrocerySections = require("../models/GrocerySections");
const Recipe = require("../models/recipe");
const os = require("os");
const mongoose = require("mongoose");

// @desc Get list of grocery sections
// @route GET /api/v1/settings/grocerySections
// @access Public
exports.getGrocerySections = async (req, res, next) => {
    console.log("getGrocerySections");
    try {
        var grocerySections = await GrocerySections.find();
        if (grocerySections.length === 0) {
            var createStatus = await createDefaultGrocerySections();
            if (createStatus.success) {
                grocerySections = [createStatus.grocerySectionsDoc];
            } else {
                throw new Error(createStatus.error);
            }
        }

        return res.status(200).json({
            success: true,
            count: grocerySections.length,
            data: grocerySections,
        });
    } catch (err) {
        console.log(`${err}`.red);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// Helper method to create default grocery section document
const createDefaultGrocerySections = async () => {
    console.log("createDefaultGrocerySections");
    try {
        const grocerySectionObject = {
            default: "Other",
            sections: ["Other", "Produce", "Meat"],
        };
        const grocerySectionsDoc = await GrocerySections.create(grocerySectionObject);

        return { success: true, grocerySectionsDoc: grocerySectionsDoc };
    } catch (err) {
        console.log(`ERROR: Creating default grocery section document`.red);
        return {
            success: false,
            error: err,
        };
    }
};

// @desc Add grocery Section
// @route POST /api/v1/settings/grocerySections/_id/section_name
// @access Public
exports.addGrocerySection = async (req, res, next) => {
    console.log("addGrocerySection");
    try {
        const grocerySection = await GrocerySections.findById(req.params._id);

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery section found",
            });
        }
        await GrocerySections.updateOne({ _id: req.params._id }, { $push: { sections: req.params.section_name } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Delete grocery section
// @route DELETE /api/v1/settings/grocerySections/_id/section_name
// @access Public
exports.deleteGrocerySection = async (req, res, next) => {
    console.log("deleteGrocerySection");
    try {
        await GrocerySections.updateOne({ _id: req.params._id }, { $pull: { sections: req.params.section_name } });
        await Recipe.updateMany({ "ingredients.grocerySection": req.params.section_name }, { $set: { "ingredients.$[].grocerySection": req.params.default } });

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc Set default grocery section
// @route POST /api/v1/settings/grocerySections/default/_id/section_name
// @access Public
exports.setDefaultGrocerySection = async (req, res, next) => {
    console.log("setDefaultGrocerySection");
    try {
        const grocerySection = await GrocerySections.findById(req.params._id);

        if (!grocerySection) {
            return res.status(404).json({
                success: false,
                error: "No grocery section found",
            });
        }
        await GrocerySections.updateOne({ _id: req.params._id }, { $set: { default: req.params.section_name } });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
