const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const { createShoppingListFile, getShoppingList, postNewShoppingList, addSectionIngredient, clearShoppingList } = require("../controlers/ShoppingList");

// Preserve this order
router.route("/download").all(ensureAuthenticated).get(createShoppingListFile);
router.route("/update").all(ensureAuthenticated).post(addSectionIngredient);
router.route("/:shopping_list_id").all(ensureAuthenticated).delete(clearShoppingList);
router.route("/").all(ensureAuthenticated).get(getShoppingList).post(postNewShoppingList);

module.exports = router;
