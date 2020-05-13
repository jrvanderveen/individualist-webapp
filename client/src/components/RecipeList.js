import React, { useContext, useEffect } from "react";
import { Recipe } from "./Recipe";

import { GlobalContext } from "../context/GlobalState";

export const RecipeList = () => {
    const { recipes, getRecipes } = useContext(GlobalContext);

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <h3>Recipes</h3>
            <ul className="list">
                {recipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </ul>
        </>
    );
};
