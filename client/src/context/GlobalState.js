import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
    recipes: {},
    // recipesForShoppingList: [],
    creatingShoppingList: false,
    editing: false,
    error: null,
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
            await axios.delete(`/api/v1/recipes/${recipeId}/${ingredient._id}`);
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
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.post(`/api/v1/recipes/${recipeId}/${ingredient.name}`, ingredient, config);
            dispatch({
                type: "ADD_RECIPE_INGREDIENT",
                payload: [recipeId, res.data.data.ingredient],
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    function setCreateShoppingListBool() {
        try {
            dispatch({
                type: "SET_CREATE_SHOPPING_LIST_BOOL",
                payload: "",
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    function setRecipeForShoppingList(recipeId) {
        try {
            dispatch({
                type: "SET_RECIPE_FOR_SHOPPING_LIST",
                payload: recipeId,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    function setEditBool() {
        try {
            dispatch({
                type: "SET_EDIT_BOOL",
                payload: "",
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error.response.data.error,
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                recipes: state.recipes,
                creatingShoppingList: state.creatingShoppingList,
                editing: state.editing,
                error: state.error,
                getRecipes,
                deleteRecipe,
                addRecipe,
                deleteRecipeIngredient,
                addRecipeIngredient,
                setCreateShoppingListBool,
                setRecipeForShoppingList,
                setEditBool,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
