const express = require("express");
const router = express.Router();
const { getRecipies, addRecipie, deleteRecipie } = require("../controlers/recipies");

router.route("/").get(getRecipies).post(addRecipie);

router.route("/:id").delete(deleteRecipie);

module.exports = router;
