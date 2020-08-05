import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/globalState";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";

// Styled components
const GalaryWrapper = styled.div`
    width: 70vw;
    height: 70vh;
`;

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
                let images = [];
                res.data.images.forEach((image) => {
                    images.push({ original: image, thumbnail: null });
                    images.push({ original: image, thumbnail: null });
                    images.push({ original: image, thumbnail: null });
                    images.push({ original: image, thumbnail: null });
                });
                console.log(images);
                setRecipeDetails({ ...recipes[_id], images: images });
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
                    {recipeDetails.images ? (
                        <GalaryWrapper>
                            <ImageGallery items={recipeDetails.images} />
                        </GalaryWrapper>
                    ) : null}
                </>
            ) : null}
            {/* <h1>{recipe ? recipe.name : "test"}</h1> */}
        </>
    );
};
