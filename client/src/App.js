import React from "react";
import { Header } from "./components/Header";
// import { Balance } from "./components/Balance";
// import { IncomeExpenses } from "./components/IncomeExpenses";
import { RecipeList } from "./components/RecipeList";
import { AddRecipe } from "./components/AddRecipe";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

function App() {
    return (
        <GlobalProvider>
            <Header />
            <div className="container">
                <RecipeList />
                <AddRecipe />
            </div>
        </GlobalProvider>
    );
}

export default App;
