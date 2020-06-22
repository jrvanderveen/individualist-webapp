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
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //On start up get recipes and grocery sections
    //Get recipes grocery sections then recipes to avoid incomplete data
    async function onStartUp() {
        // await getGrocerySections();
        await getRecipes();
        // await getShoppingList();
    }

    //////////////////////////////////////////////////////////////
    // RECIPES
    //Get all recipes and add to state
    async function getRecipes() {
        try {
            const res = await axios
                .get("/api/v1/recipes")
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
                });

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

    // Delete specific recipe
    async function deleteRecipe(id) {
        try {
            await axios
                .delete(`/api/v1/recipes/${id}`)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
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
    async function addRecipe(recipe) {
        console.log(recipe);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios
                .post("/api/v1/recipes", recipe, config)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
                });
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

    // Delete ingredient from specific recipe
    async function deleteRecipeIngredient(recipeId, ingredient) {
        try {
            await axios
                .delete(`/api/v1/recipes/${recipeId}/${ingredient._id}`)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
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
    async function addRecipeIngredient(recipeId, ingredient) {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios
                .post(`/api/v1/recipes/${recipeId}`, ingredient, config)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
                });
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

    // Add all selected recipes ingredients to shopping list
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
        await axios
            .post("/api/v1/shoppingList", state.shoppingList, config)
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
    }

    // Save edited recipe
    async function saveEditedRecipe(recipe) {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .post("/api/v1/recipes/edit", recipe, config)
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
        try {
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

    //////////////////////////////////////////////////////////////
    // SHOPPINGLIST
    // Get current shopping list and add to state
    async function getShoppingList() {
        const res = await axios
            .get("/api/v1/shoppingList")
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
        try {
            dispatch({
                type: "GET_SHOPPING_LIST",
                payload: res.data.data,
            });
        } catch (error) {
            dispatch({
                type: "RECIPE_ERROR",
                payload: error,
            });
        }
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
    async function addIngredientToShoppingListSection(sectionName, ingredient) {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        let _id = state.shoppingList._id;
        const res = await axios
            .post("/api/v1/shoppingList/update", { _id, sectionName, ingredient }, config)
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
        const ingredientObj = res.data.data.ingredient;
        try {
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

    // Non async function, force wait before rerendering shopping list
    function clearShoppingList() {
        let empty = true;
        Object.keys(state.shoppingList.grocerySectionIngredientsMap).forEach((key) => {
            if (state.shoppingList.grocerySectionIngredientsMap[key].length > 0) {
                empty = false;
            }
        });
        if (empty) return;

        let _id = state.shoppingList._id;
        axios
            .delete(`/api/v1/shoppingList/${_id}`)
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
        try {
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
    async function getGrocerySections() {
        try {
            const res = await axios
                .get("/api/v1/settings/grocerySections")
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
                });
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
            await axios
                .post(`/api/v1/settings/grocerySections/${_id}/${sectionName}`)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
                });
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
        await axios
            .post(`/api/v1/settings/grocerySections/${_id}/${sectionName}/${defaultSection}`, state.shoppingList, config)
            .then(function (response) {
                if (response.data.redirect === "/") {
                    window.location = "/";
                } else if (response.data.redirect === "/login") {
                    window.location = "/login";
                }
            })
            .catch(function (error) {
                window.location = "/login";
            });
    }

    // Set the default section
    async function setDefaultGrocerySection(_id, sectionName) {
        try {
            await axios
                .post(`/api/v1/settings/grocerySections/default/${_id}/${sectionName}`)
                .then(function (response) {
                    if (response.data.redirect === "/") {
                        window.location = "/";
                    } else if (response.data.redirect === "/login") {
                        window.location = "/login";
                    }
                })
                .catch(function (error) {
                    window.location = "/login";
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
                recipes: state.recipes,
                shoppingList: state.shoppingList,
                creatingShoppingList: state.creatingShoppingList,
                grocerySections: state.grocerySections,
                error: state.error,
                onStartUp,
                getRecipes,
                deleteRecipe,
                addRecipe,
                deleteRecipeIngredient,
                addRecipeIngredient,
                getShoppingList,
                setCreateShoppingListBool,
                addRecipeToShoppingList,
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
