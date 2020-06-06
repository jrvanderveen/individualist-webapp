import React from "react";
import { Header } from "./components/Header";
import { RecipeList } from "./components/RecipeList";
import { AddRecipe } from "./components/AddRecipe";
import { Options } from "./components/Options";

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
    return (
        <GlobalProvider>
            <GlobalStyle />
            <Header />
            <Options />
            <Container>
                <RecipeList />
                <AddRecipe />
            </Container>
        </GlobalProvider>
    );
}

export default App;
