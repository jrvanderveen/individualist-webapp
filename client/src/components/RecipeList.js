import React, { useContext, useEffect } from "react";
import { Recipe } from "./Recipe";
import { H3 } from "../elements/index";

import { GlobalContext } from "../context/GlobalState";

export const RecipeList = () => {
    const { recipes, getRecipes } = useContext(GlobalContext);

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <H3>Recipes</H3>
            <ul className="list">
                {recipes.map((recipe) => (
                    <Recipe key={recipe._id} recipe={recipe} />
                ))}
            </ul>
        </>
    );
};
