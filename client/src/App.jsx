import React from "react";
import "./App.css";
import { GlobalProvider } from "./context/globalState";
import { Routes } from "./routes";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7f7f7;
    min-height: 95vh;
    min-width: 95vw;
    font-family: "Lato", sans-serif;
  }
  :root { 
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    * {
        box-sizing: border-box;
        overflow-wrap: break-all;
        white-space: normal;
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
