import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import DefaultDict from "../utils/DefaultDict";

// Initial state
const initialState = {
    grocerySections: {
        /* PERSISTS
            default, string
            sections, array of strings
        */
        default: "",
        sections: [],
    },

    recipes: {
        /*PERSISTS
            RecipeObjectId: {recipe}
                reipe:
                    __v, int
                    _id, string
                    name, string
                    servings, int
                    URL, string
                    createdAt, string
                    addToShoppingList, bool
                    ingredients: [{ingredient}] array of ingredients 
                        name,
                        grocerySection,
                        _id
        */
    },
    shoppingList: {
        /* PERSISTS
            grocerySectionIngredientMap, {sectionsName: [ingredients]}
        */
        grocerySectionIngredientsMap: new DefaultDict(Array), //dont want key errors
    },
    creatingShoppingList: false,
    editing: false,
    error: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //On start up get recipes and grocery sections
    //Get recipes grocery sections then recipes to avoid incomplete data
    async function onStartUp() {
        await getGrocerySections();
        await getRecipes();
        saveAddedRecipes();
    }

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
    function setCreateShoppingListBool(cancelOrClose) {
        try {
            dispatch({
                type: "SET_CREATE_SHOPPING_LIST_BOOL",
                payload: cancelOrClose,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Add recipe ingredients to shopping list
    function addRecipeToShoppingList(recipeId) {
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

    // Add recipe ingredients to shopping list
    function saveAddedRecipes() {
        try {
            dispatch({
                type: "SAVE_RECIPES_ADDED_TO_SHOPPING_LIST",
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // // Return object containing ingredients brokent down by grocery section for all selected recipes
    // function returnSelectedRecipesIngredientMap() {
    //     // using a default dict here to avoid key errors
    //     // A key error could happen if a user has multiple tabs open and deletes a grocery section in the settings page
    //     const recipeIngredientsBySection = new DefaultDict(Array);

    //     state.grocerySections.sections.forEach((section) => {
    //         recipeIngredientsBySection[section] = [];
    //     });

    //     Object.entries(state.recipes).forEach(([_id, recipe]) => {
    //         if (recipe.addToShoppingList === true) {
    //             Object.entries(recipe.ingredients).forEach(([index, ingredient]) => {
    //                 recipeIngredientsBySection[ingredient.grocerySection].push({ _id: ingredient._id, name: ingredient.name });
    //             });
    //         }
    //     });
    //     return recipeIngredientsBySection;
    // }

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
    async function deleteGrocerySection(_id, sectionName, defaultSection) {
        try {
            await axios.delete(`/api/v1/settings/grocerySections/${_id}/${sectionName}/${defaultSection}`);
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

    // Set the default section
    async function setDefaultGrocerySection(_id, sectionName) {
        try {
            await axios.post(`/api/v1/settings/grocerySections/default/${_id}/${sectionName}`);
            dispatch({
                type: "SET_GROCERY_SECTION_DEFAULT",
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
                shoppingList: state.shoppingList,
                creatingShoppingList: state.creatingShoppingList,
                editing: state.editing,
                grocerySections: state.grocerySections,
                error: state.error,
                onStartUp,
                getRecipes,
                deleteRecipe,
                addRecipe,
                deleteRecipeIngredient,
                addRecipeIngredient,
                setCreateShoppingListBool,
                addRecipeToShoppingList,
                saveAddedRecipes,
                getGrocerySections,
                addGrocerySection,
                deleteGrocerySection,
                setDefaultGrocerySection,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
