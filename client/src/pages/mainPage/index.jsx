import React, { useState } from "react";
import { RecipeList } from "./recipeList";
import { Header } from "./header";
import { AddRecipe } from "./addRecipe";
import { Options } from "./options";
import { ShoppingListPopUp } from "./shoppingList";
import styled from "styled-components";

// Styled Components
const Container = styled.section`
    margin: 30px auto;
    width: 100vw;
    max-width: 1000px;
    padding: 5px;
`;

/*
    SUMMARY:
        Displays recipes and shopping list will popup infront

    PARAMS: 
*/
export const MainPage = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const togglePopUp = () => {
        setShowPopUp(!showPopUp);
    };
    return (
        <>
            <Header />
            <Container>
                <Options togglePopUpFunc={togglePopUp} showPopUp={showPopUp} />

                <RecipeList />
                <AddRecipe />
            </Container>
            {showPopUp === true ? <ShoppingListPopUp togglePopUpFunc={togglePopUp} /> : null}
        </>
    );
};
