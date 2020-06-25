const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const { getRecipes, addRecipe, deleteRecipe, deleteRecipeIngredient, addRecipeIngredient, saveEditedRecipe } = require("../controlers/recipes");

//RECIPE
router.route("/").all(ensureAuthenticated).get(getRecipes);
router.route("/add").all(ensureAuthenticated).get(getRecipes).post(addRecipe);
router.route("/delete").all(ensureAuthenticated).post(deleteRecipe);
router.route("/edit").all(ensureAuthenticated).post(saveEditedRecipe);
//INGREDIENTS
router.route("/ingredient/delete").all(ensureAuthenticated).post(deleteRecipeIngredient);
router.route("/ingredient/add").all(ensureAuthenticated).post(addRecipeIngredient);
module.exports = router;
