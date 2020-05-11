import React from "react";
import { Header } from "./components/Header";
// import { Balance } from "./components/Balance";
// import { IncomeExpenses } from "./components/IncomeExpenses";
import { RecipieList } from "./components/RecipieList";
import { AddRecipie } from "./components/AddRecipie";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

function App() {
    return (
        <GlobalProvider>
            <Header />
            <div className="container">
                <RecipieList />
                <AddRecipie />
            </div>
        </GlobalProvider>
    );
}

export default App;
