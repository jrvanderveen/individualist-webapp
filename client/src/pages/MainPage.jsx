import React, { useState } from "react";
import { Header } from "../components/MainPage/Header";
import { RecipeList } from "../components/MainPage/RecipeList";
import { AddRecipe } from "../components/MainPage/AddRecipe";
import { Options } from "../components/MainPage/Options";
import { ShoppingListPopUp } from "../components/MainPage/ShoppingListPopUp";
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
                <Options togglePopUpFunc={togglePopUp} />

                <RecipeList />
                <AddRecipe />
            </Container>
            {showPopUp === true ? <ShoppingListPopUp togglePopUpFunc={togglePopUp} /> : null}
        </>
    );
};
