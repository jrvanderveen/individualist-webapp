import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../context/globalState";
import styled from "styled-components";
import { ImageGalleryComponent } from "./imageGallary";
import { Header } from "./header";
import { Body } from "./body";

// Styled components
const Div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5vh;
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

    const defaultImages = [{ original: placeHolderImage, thumbnail: placeHolderImage }];
    //functions
    useEffect(() => {
        if (Object.entries(recipes).length === 0) {
            onStartUp();
        }
        setRecipe(recipes[_id]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes]);
    return (
        <>
            {recipe ? (
                <>
                    <Div>
                        <Header name={recipe.name} rating={recipe.rating} />
                        <ImageGalleryComponent images={recipe.recipeDetails.images.length > 0 ? recipe.recipeDetails.images : defaultImages} recipeId={_id} />
                        <Body recipe={recipe} />
                    </Div>
                </>
            ) : null}
        </>
    );
};
