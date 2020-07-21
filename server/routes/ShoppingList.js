const express = require("express");
const { ensureAuthenticated } = require("../controlers/auth/auth");
const router = express.Router();
const { createShoppingListFile, getShoppingList, postNewShoppingList, addSectionIngredient, clearShoppingList } = require("../controlers/ShoppingList");

// Preserve this order
router.route("/download").all(ensureAuthenticated).get(createShoppingListFile);
router.route("/update").all(ensureAuthenticated).post(addSectionIngredient);
router.route("/clear").all(ensureAuthenticated).post(clearShoppingList);
router.route("/").all(ensureAuthenticated).get(getShoppingList).post(postNewShoppingList);

module.exports = router;
