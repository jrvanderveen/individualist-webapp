import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
    recipes: [],
    error: null,
    loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //
    async function getRecipes() {
        try {
            const res = await axios.get("/api/v1/recipes");
            console.log(res.data.data);
            dispatch({
                type: "GET_RECIPES",
                payload: res.data.data,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    // Recipe Actions
    async function deleteRecipe(id) {
        try {
            await axios.delete(`/api/v1/recipes/${id}`);
            dispatch({
                type: "DELETE_RECIPE",
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    async function addRecipe(recipe) {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/v1/recipes", recipe, config);
            dispatch({
                type: "ADD_RECIPE",
                payload: res.data.data,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    // Ingredient Actions
    async function deleteRecipeIngredient(recipeId, ingredient) {
        try {
            await axios.delete(`/api/v1/recipes/${recipeId}/${ingredient}`);
            dispatch({
                type: "DELETE_RECIPE_INGREDIENT",
                payload: [recipeId, ingredient],
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    async function addRecipeIngredient(recipeId, ingredient) {
        // TODO:
        // try {
        //     const res = await axios.post("/api/v1/recipes", recipe);
        //     dispatch({
        //         type: "ADD_RECIPE_INGREDIENT",
        //         payload: [recipeId, ingredient],
        //     });
        // } catch (error) {
        //     dispatch({
        //         type: "RECIPE_ERROR",
        //         payload: error.response.data.error,
        //     });
        // }
    }

    return (
        <GlobalContext.Provider
            value={{
                recipes: state.recipes,
                error: state.error,
                loading: state.loading,
                getRecipes,
                deleteRecipe,
                addRecipe,
                deleteRecipeIngredient,
                addRecipeIngredient,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
