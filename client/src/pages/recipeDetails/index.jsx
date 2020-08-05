import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/globalState";

/*
    SUMMARY:
        Page to display more information about recipe

    PARAMS: 
        _id: recipe ID

*/
export const RecipeDetails = ({ _id }) => {
    //Context
    const { recipes, onStartUp } = useContext(GlobalContext);

    //State
    const [recipe, setRecipe] = useState(recipes[_id]);
    const [recipeDetails, setRecipeDetails] = useState({});
    //functions

    useEffect(() => {
        if (Object.entries(recipes).length === 0) {
            onStartUp().then((res) => {});
        }
        setRecipe(recipes[_id]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes]);

    useEffect(() => {
        const errors = [];
        try {
            axios.post("/api/recipes/details", { _id, _id }).then((res) => {
                console.log({ ...recipes[_id], images: res.data.images });
                setRecipeDetails({ ...recipes[_id], images: res.data.images });
            });
        } catch (error) {
            errors.push(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {recipe ? (
                <>
                    <h1>{recipe.name}</h1>
                    {recipeDetails.images ? recipeDetails.images.map((image) => <a href={image}> {image} </a>) : null}
                </>
            ) : null}
            {/* <h1>{recipe ? recipe.name : "test"}</h1> */}
        </>
    );
};
