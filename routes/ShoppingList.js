const express = require("express");
const router = express.Router();
const { createShoppingListFile } = require("../controlers/ShoppingList");

router.route("/").get(createShoppingListFile);

module.exports = router;
