import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/globalState";
import styled from "styled-components";
import { ImageGalleryComponent } from "./imageGallary";
import { Header } from "./header";

// Styled components
const Div = styled.div`
    padding-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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
    const placeHolderImage = "https://via.placeholder.com/250X250.png?text=Add+Recipe+Image";

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
            axios.post("/api/recipes/details", { _id: _id }).then((res) => {
                let images = [];
                res.data.images.forEach((image) => {
                    images.push({ original: image, thumbnail: image });
                });
                if (images.length > 0) {
                    setRecipeDetails({ ...recipes[_id], images: images });
                } else {
                    setRecipeDetails({ ...recipes[_id], images: [{ original: placeHolderImage, thumbnail: placeHolderImage }] });
                }
            });
        } catch (error) {
            errors.push(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addImageFunc = (URL) => {
        console.log("here");
        const images = recipeDetails.images;
        if (images.length > 0 && images[0].original === placeHolderImage) {
            images.splice(0, 1);
        }
        images.unshift({ original: URL, thumbnail: URL });
        setRecipeDetails({ ...recipeDetails, images: images });
    };

    return (
        <>
            {recipe ? (
                <>
                    <Div>
                        <Header name={recipe.name} />
                        {recipeDetails.images ? <ImageGalleryComponent addImageFunc={addImageFunc} images={recipeDetails.images} recipeId={_id} /> : null}
                    </Div>
                </>
            ) : null}
        </>
    );
};
