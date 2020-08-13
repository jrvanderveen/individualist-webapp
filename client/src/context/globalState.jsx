import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import DefaultDict from "../utils/defaultDict";
import { Redirect } from "react-router-dom";
const ObjectID = require("mongoose").Types.ObjectId;

// Initial state
const initialState = {
    loggedIn: false,
    username: "",
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
            RecipeObjectId: string
                reipe:
                    __v, int
                    _id, string
                    name, string
                    servings, int
                    URL, string
                    createdAt, string
                    ingredients: [{ingredient}] array of ingredients 
                        name,
                        grocerySection,
                        _id
                    recipeDetails: 
                        prepTime
                        cookTime
                        dificulty
                        notes
                        Instructions
                        images
                        createdAt                       
                    //not saved to db
                    addToShoppingList, bool
        */
    },
    shoppingList: {
        /* PERSISTS
            _id, objectID
            grocerySectionIngredientMap, {sectionsName: [ingredients] ...}
        */
        _id: -1,
        grocerySectionIngredientsMap: new DefaultDict(Array), //dont want key errors
    },
    creatingShoppingList: false,
    error: null,
    postMessage: "",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // UTIL
    // Function used for all protected routes when dispatching comes after post
    function parseRedirectWithDispatch(redirect, data, dispatchString) {
        if (redirect.success) {
            //success
            if (dispatchString) {
                dispatch({
                    type: dispatchString,
                    payload: data,
                });
            }
        } else {
            return <Redirect to={redirect.redirect ? redirect.redirect : "/login"} />;
        }
    }
    // Function used for all protected routes when dispatching can come before post
    function parseRedirectNoDispatch(redirect) {
        if (!redirect.success) {
            return <Redirect to={redirect.redirect ? redirect.redirect : "/login"} />;
        }
    }

    //////////////////////////////////////////////////////////////
    // SIGNIN
    // Check login state of user before initial render
    async function isUserSignedIn() {
        try {
            await axios
                .post("/api/login/state")
                .then((res) => {
                    dispatch({
                        type: "LOG_IN_STATE",
                        payload: res.data,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
        }
    }
    // Log user in
    async function signOut() {
        try {
            await axios.get("/api/login/signOut");
            dispatch({
                type: "LOG_USER_OUT",
            });
            return <Redirect to="/login" />;
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
        }
    }

    // Log user in
    async function signIn(userObj) {
        try {
            const res = await axios.post("/api/login/signIn", userObj);
            dispatch({
                type: "LOG_USER_IN",
                payload: res.data.username,
            });
            return res.data.success;
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
            return false;
        }
    }

    //On start up get recipes and grocery sections
    //Get recipes grocery sections then recipes to avoid incomplete data
    // TODO:
    //  Update to use just one request
    async function onStartUp() {
        // Preserve order
        await getGrocerySections();
        await getRecipes();
        await getShoppingList();
    }

    //////////////////////////////////////////////////////////////
    // RECIPES
    // Get all recipes and add to state
    // @PROTECTED
    async function getRecipes() {
        try {
            await axios.get("/api/recipes").then((res) => {
                parseRedirectWithDispatch(res.data, res.data.data, "GET_RECIPES");
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Delete specific recipe
    // @PROTECTED
    async function deleteRecipe(id) {
        try {
            axios.post(`/api/recipes/delete`, { _id: id }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
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
    // @PROTECTED
    async function addRecipe(recipe) {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            await axios.post("/api/recipes/add", recipe, config).then((res) => {
                parseRedirectWithDispatch(res.data, { recipe: res.data.data, scraper: res.data.scraper }, "ADD_RECIPE");
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Delete ingredient from specific recipe
    // @PROTECTED
    async function deleteRecipeIngredient(recipeId, ingredient) {
        try {
            axios.post(`/api/recipes/ingredient/delete`, { recipeId: recipeId, ingredientId: ingredient._id }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
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
    // @PROTECTED
    async function addRecipeIngredient(recipeId, ingredient) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            ingredient._id = new ObjectID();
            axios.post(`/api/recipes/ingredient/add`, { recipeId: recipeId, ingredient: ingredient }, config).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "ADD_RECIPE_INGREDIENT",
                payload: [recipeId, ingredient],
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Mark recipe to be added to shopping list
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

    // Save edited recipe
    // @PROTECTED
    async function saveEditedRecipe(recipe) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios.post("/api/recipes/edit", recipe, config).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "SAVE_EDITED_RECIPE",
                payload: recipe,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Update recipe rating
    // @PROTECTED
    async function updateRecipeRating(_id, rating) {
        try {
            axios.post("/api/recipes/rate", { _id, rating }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "UPDATE_RECIPE_RATING",
                payload: { _id, rating },
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Update recipe details notes
    // @PROTECTED
    async function updateRecipeDetailTimes(_id, data) {
        try {
            axios.post("/api/recipes/details/times", { _id, data }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "UPDATE_RECIPE_DETAILS_TIMES",
                payload: { _id, data },
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Update recipe details notes
    // @PROTECTED
    async function updateRecipeDetailsNotes(_id, notes) {
        try {
            axios.post("/api/recipes/details/notes", { _id, notes }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "UPDATE_RECIPE_DETAILS_NOTES",
                payload: { _id, notes },
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }
    // Update recipe details isntructions
    // @PROTECTED
    async function updateRecipeDetailsInstructions(_id, instructions) {
        try {
            axios.post("/api/recipes/details/instructions", { _id, instructions }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "UPDATE_RECIPE_DETAILS_INSTRUCTIONS",
                payload: { _id, instructions },
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Update recipe rating
    // @PROTECTED
    async function uploadRecipeImage(fd, recipeId) {
        try {
            await axios.post("/api/recipes/details/uploadImage", fd).then((res) => {
                parseRedirectWithDispatch(res.data, { resdata: res.data, recipeId: recipeId }, "ADD_RECIPE_IMAGE");
            });
            return "";
        } catch (error) {
            if (error.response.data.error.startsWith("Invalid file type")) {
                return error.response.data.error;
            } else {
                // if(error.response.data)
                dispatch({
                    type: "RECIPE_ERROR",
                    payload: error,
                });
            }
        }
        return "";
    }

    //////////////////////////////////////////////////////////////
    // SHOPPINGLIST
    // Get current shopping list and add to state
    // @PROTECTED
    async function getShoppingList() {
        try {
            await axios.get("/api/shoppingList").then((res) => {
                parseRedirectWithDispatch(res.data, res.data.data, "GET_SHOPPING_LIST");
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Add all selected recipes ingredients to shopping list
    // @PROTECTED
    async function saveAddedRecipes() {
        //dispatch to update state then post new ShoppingList pulled from updated state
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
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post("/api/shoppingList", state.shoppingList, config)
            .then((res) => {
                parseRedirectNoDispatch(res.data);
            })
            .catch(function (error) {
                throw error;
            });
    }

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

    // Manually add ingredient to shopping list grocer section
    // @PROTECTED
    async function addIngredientToShoppingListSection(sectionName, ingredient) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let _id = state.shoppingList._id;
            const ingredientObj = { _id: ObjectID(), name: ingredient, lineThrough: false };
            axios.post("/api/shoppingList/update", { _id, sectionName, ingredientObj }, config).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "ADD_INGREDIENT_TO_SHOPPING_LIST_SECTION",
                payload: [sectionName, ingredientObj],
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Manually add ingredient to shopping list grocer section
    // @PROTECTED
    async function setIngredientLineThrough(sectionName, index, value) {
        try {
            let _id = state.shoppingList._id;
            axios.post("/api/shoppingList/lineThrough", { _id, sectionName, index, value }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "SET_INGREDIENT_LINE_THROUGH_SHOPPING_LIST",
                payload: [sectionName, index, value],
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    // Non async function, force wait before rerendering shopping list
    // @PROTECTED
    function clearShoppingList() {
        try {
            let _id = state.shoppingList._id;
            axios.post("/api/shoppingList/clear", { _id: _id }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
            dispatch({
                type: "CLEAR_SHOPPING_LIST",
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
    }

    //////////////////////////////////////////////////////////////
    // GROCERYSECTIONS
    // Get list of all current sections and add to state
    // @PROTECTED
    async function getGrocerySections() {
        try {
            await axios.get("/api/settings/grocerySections").then((res) => {
                parseRedirectWithDispatch(res.data, res.data.data ? res.data.data[0] : null, "GET_GROCERY_SECTIONS");
            });
        } catch (error) {
            dispatch({
                type: "SETTINGS_ERROR",
                payload: error,
            });
        }
    }

    // Add new grocery section
    // @PROTECTED
    async function addGrocerySection(_id, sectionName) {
        try {
            await axios.post(`/api/settings/grocerySections/add`, { _id: _id, sectionName: sectionName }).then((res) => {
                parseRedirectWithDispatch(res.data, sectionName, "ADD_GROCERY_SECTION");
            });
        } catch (error) {
            dispatch({
                type: "SETTINGS_ERROR",
                payload: error,
            });
        }
    }

    // Delete grocery section
    // @PROTECTED
    async function deleteGrocerySection(_id, sectionName, defaultSection) {
        try {
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
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios
            .post(
                "/api/settings/grocerySections/delete",
                { _id: _id, sectionName: sectionName, defaultSection: defaultSection, shoppingList: state.shoppingList },
                config
            )
            .then((res) => {
                parseRedirectNoDispatch(res.data);
            })
            .catch(function (error) {
                throw error;
            });
    }

    // Set the default section
    // @PROTECTED
    async function setDefaultGrocerySection(_id, sectionName) {
        try {
            axios.post("/api/settings/grocerySections/default/", { _id: _id, sectionName: sectionName }).then((res) => {
                parseRedirectNoDispatch(res.data);
            });
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
                loggedIn: state.loggedIn,
                username: state.username,
                recipes: state.recipes,
                shoppingList: state.shoppingList,
                creatingShoppingList: state.creatingShoppingList,
                grocerySections: state.grocerySections,
                error: state.error,
                postMessage: state.postMessage,
                signOut,
                isUserSignedIn,
                signIn,
                onStartUp,
                getRecipes,
                deleteRecipe,
                addRecipe,
                updateRecipeRating,
                updateRecipeDetailTimes,
                updateRecipeDetailsNotes,
                updateRecipeDetailsInstructions,
                uploadRecipeImage,
                deleteRecipeIngredient,
                addRecipeIngredient,
                getShoppingList,
                setCreateShoppingListBool,
                addRecipeToShoppingList,
                setIngredientLineThrough,
                saveAddedRecipes,
                addIngredientToShoppingListSection,
                clearShoppingList,
                getGrocerySections,
                addGrocerySection,
                deleteGrocerySection,
                setDefaultGrocerySection,
                saveEditedRecipe,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
