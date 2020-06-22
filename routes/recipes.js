const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const { getRecipes, addRecipe, deleteRecipe, deleteRecipeIngredient, addRecipeIngredient, saveEditedRecipe } = require("../controlers/recipes");

// Preserve this order
router.route("/edit").all(ensureAuthenticated).post(saveEditedRecipe);
router.route("/").all(ensureAuthenticated).get(getRecipes).post(addRecipe);
router.route("/:_id").all(ensureAuthenticated).delete(deleteRecipe).post(addRecipeIngredient);
router.route("/:recipe_id/:ingredient_id").all(ensureAuthenticated).delete(deleteRecipeIngredient);

module.exports = router;
