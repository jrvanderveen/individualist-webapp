import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
    recipies: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Recipie Actions
    function deleteRecipie(id) {
        dispatch({
            type: "DELETE_RECIPIE",
            payload: id,
        });
    }

    function addRecipie(recipie) {
        dispatch({
            type: "ADD_RECIPIE",
            payload: recipie,
        });
    }

    // Ingredient Actions
    function deleteRecipieIngredient(recipieId, ingredientIndex) {
        dispatch({
            type: "DELETE_RECIPIE_INGREDIENT",
            payload: [recipieId, ingredientIndex],
        });
    }

    function addRecipieIngredient(recipieId, ingredient) {
        dispatch({
            type: "ADD_RECIPIE_INGREDIENT",
            payload: [recipieId, ingredient],
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                recipies: state.recipies,
                deleteRecipie,
                addRecipie,
                deleteRecipieIngredient,
                addRecipieIngredient,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
