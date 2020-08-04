import React from "react";
import axios from "axios";

/*
    SUMMARY:
        Page to display more information about recipe

    PARAMS: 
        _id: recipe ID

*/
export const RecipeDetails = ({ _id }) => {
    // Download shopping list in plain text from server
    async function getRecipeDetails() {
        const errors = [];

        try {
            await axios.get("/api/recipe/download").then((response) => {});
        } catch (error) {
            errors.push(error);
        }
    }

    return <>recipe page</>;
};
