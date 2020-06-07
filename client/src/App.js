import React, { useState } from "react";
import { Header } from "./components/Header";
import { RecipeList } from "./components/RecipeList";
import { AddRecipe } from "./components/AddRecipe";
import { Options } from "./components/Options";
import { ShoppingListPopUp } from "./components/ShoppingListPopUp";

import { GlobalProvider } from "./context/GlobalState";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 1250px;
    margin: 0;
    font-family: "Lato", sans-serif;
  }

  :root {
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    * {
        box-sizing: border-box;
    } 
    .error {
    color: #c0392b;
}

`;

const Container = styled.section`
    margin: 30px auto;
    width: 600px;
`;

function App() {
    const [showPopUp, setShowPopUp] = useState(false);
    const togglePopUp = () => {
        setShowPopUp(!showPopUp);
        console.log("function called from app.js", showPopUp);
    };
    console.log("show pop up", showPopUp);
    return (
        <GlobalProvider>
            <GlobalStyle />
            <Header />
            <Container>
                <Options togglePopUpFunc={togglePopUp} />
                <RecipeList />
                <AddRecipe />
            </Container>
            {showPopUp === true ? <ShoppingListPopUp togglePopUpFunc={togglePopUp} /> : null}
        </GlobalProvider>
    );
}

export default App;
