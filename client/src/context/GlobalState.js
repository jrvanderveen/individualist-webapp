import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
    grocerySections: { sections: [] },
    recipes: {},
    creatingShoppingList: false,
    editing: false,
    error: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Get all recipes
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
                payload: error,
            });
        }
    }

    // Recipe Actions
    // Delete specific recipe
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
                payload: error,
            });
        }
    }

    // Add recipe with current content (no ingredients yet)
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
                payload: error,
            });
        }
    }

    // Ingredient Actions
    // Delete ingredient from specific recipe
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
                payload: error,
            });
        }
    }

    // Append ingredient to end of specific recipe
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
                payload: error,
            });
        }
    }

    // Setting actions
    // This setting controls visibility of select recipe buttons
    function setCreateShoppingListBool() {
        try {
            dispatch({
                type: "SET_CREATE_SHOPPING_LIST_BOOL",
                payload: "",
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Set or Unset recipe attribute indicating if it should be part of the shopping list
    function setRecipeForShoppingList(recipeId) {
        try {
            dispatch({
                type: "SET_RECIPE_FOR_SHOPPING_LIST",
                payload: recipeId,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Set or unset
    // function setEditBool() {
    //     try {
    //         dispatch({
    //             type: "SET_EDIT_BOOL",
    //             payload: "",
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: "RECIPE_ERROR",
    //             payload: error,
    //         });
    //     }
    // }

    // Shopping List Actions
    // Return object containing ingredients brokent down by grocery section for all selected recipes
    function returnSelectedRecipesIngredientMap() {
        let recipeIngredientsBySection = {};
        const grocerySectionList = ["Produce", "Meat/Seafood", "Deli/Prepared", "Other"];
        grocerySectionList.forEach((section) => {
            recipeIngredientsBySection[section] = [];
        });

        Object.entries(state.recipes).forEach(([_id, recipe]) => {
            if (recipe.forShoppingList === true) {
                Object.entries(recipe.ingredients).forEach(([index, ingredient]) => {
                    recipeIngredientsBySection[ingredient.grocerySection].push({ _id: ingredient._id, name: ingredient.name });
                });
            }
        });
        return recipeIngredientsBySection;
    }

    // Grocery Section Actions
    // Get list of all current sections
    async function getGrocerySections() {
        try {
            const res = await axios.get("/api/v1/settings/grocerySections");
            dispatch({
                type: "GET_GROCERY_SECTIONS",
                payload: res.data.data[0],
            });
        } catch (error) {
            dispatch({
                type: "SETTINGS_ERROR",
                payload: error,
            });
        }
    }
    // Add new grocery section
    async function addGrocerySection(_id, sectionName) {
        console.log("adding section");
        try {
            await axios.post(`/api/v1/settings/grocerySections/${_id}/${sectionName}`);
            dispatch({
                type: "ADD_GROCERY_SECTION",
                payload: sectionName,
            });
        } catch (error) {
            dispatch({
                type: "SETTINGS_ERROR",
                payload: error,
            });
        }
    }

    // Delete grocery section
    async function deleteGrocerySection(_id, sectionName) {
        console.log("deleteing");
        try {
            await axios.delete(`/api/v1/settings/grocerySections/${_id}/${sectionName}`);
            dispatch({
                type: "DELETE_GROCERY_SECTION",
                payload: sectionName,
            });
        } catch (error) {
            dispatch({
                type: "SETTINGS_ERROR",
                payload: error,
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                recipes: state.recipes,
                creatingShoppingList: state.creatingShoppingList,
                editing: state.editing,
                grocerySections: state.grocerySections,
                error: state.error,
                getRecipes,
                deleteRecipe,
                addRecipe,
                deleteRecipeIngredient,
                addRecipeIngredient,
                setCreateShoppingListBool,
                setRecipeForShoppingList,
                // setEditBool,
                returnSelectedRecipesIngredientMap,
                getGrocerySections,
                addGrocerySection,
                deleteGrocerySection,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
