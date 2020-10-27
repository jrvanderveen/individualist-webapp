const express = require("express");
const { ensureAuthenticated } = require("../controlers/auth/auth");
const router = express.Router();
const {
    getGrocerySections,
    addGrocerySection,
    deleteGrocerySection,
    setDefaultGrocerySection,
    getMealTypes,
    addMealType,
    deleteMealType,
    setDefaultMealType,
} = require("../controlers/settings");

// Settings
// /api/settings

// Grocery Sections
router.route("/grocerySections").all(ensureAuthenticated).get(getGrocerySections);
router.route("/grocerySections/add").all(ensureAuthenticated).post(addGrocerySection);
router.route("/grocerySections/delete").all(ensureAuthenticated).post(deleteGrocerySection);

router.route("/grocerySections/default").all(ensureAuthenticated).post(setDefaultGrocerySection);

// Meal Types
router.route("/mealTypes").all(ensureAuthenticated).get(getMealTypes);
router.route("/mealTypes/add").all(ensureAuthenticated).post(addMealType);
router.route("/mealTypes/delete").all(ensureAuthenticated).post(deleteMealType);

router.route("/mealTypes/default").all(ensureAuthenticated).post(setDefaultMealType);

module.exports = router;
