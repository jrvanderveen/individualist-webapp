import React from "react";
import { Times } from "./times";
import { Ingredients } from "./ingredients";
import { NotesAndInstructions } from "./notesAndInstructions";

/*
    SUMMARY:
        Page to display more information about recipe

    PARAMS: 
        _id: recipe ID

*/
export const Body = ({ recipe }) => {
    console.log(recipe.recipeDetails);
    return (
        <>
            <Times
                prepTime={recipe.recipeDetails.prepTime}
                cookTime={recipe.recipeDetails.cookTime}
                servings={recipe.servings}
                dificulty={recipe.recipeDetails.dificulty}
            />
            <Ingredients ingredients={recipe.ingredients} />
            <NotesAndInstructions notes={recipe.recipeDetails.notes} instructions={recipe.recipeDetails.Instructions} />
        </>
    );
};
