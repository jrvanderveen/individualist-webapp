const express = require("express");
const router = express.Router();
const { getRecipes, addRecipe, deleteRecipe, deleteRecipeIngredient, addRecipeIngredient, saveEditedRecipe } = require("../controlers/recipes");

// Preserve this order
router.route("/edit").post(saveEditedRecipe);
router.route("/").get(getRecipes).post(addRecipe);
router.route("/:_id").delete(deleteRecipe).post(addRecipeIngredient);
router.route("/:recipe_id/:ingredient_id").delete(deleteRecipeIngredient);

module.exports = router;
