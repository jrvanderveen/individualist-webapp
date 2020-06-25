import React from "react";
import "./App.css"; // Styled components used instead
import { GlobalProvider } from "./context/GlobalState";
import { Routes } from "./Routes";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 1400px;
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

// App pages:
//      Main Page - View/add/edit recipes and shoppinglist
//      Settings  - Update grocery sections / user settings (to come)
function App() {
    return (
        <GlobalProvider>
            <GlobalStyle />
            <Routes />
        </GlobalProvider>
    );
}
export default App;
