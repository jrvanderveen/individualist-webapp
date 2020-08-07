import DefaultDict from "../utils/defaultDict";
export default (state, action) => {
    switch (action.type) {
        //////////////////////////////////////////////////////////////
        // LOGIN
        // Set login state
        // action.payload = {success: bool, username: string}
        case "LOG_IN_STATE":
            return {
                ...state,
                loggedIn: action.payload.success,
                username: action.payload.username,
            };

        // Log user out
        case "LOG_USER_OUT":
            state.loggedIn = false;
            state.username = "";
            return {
                ...state,
                loggedIn: false,
                username: "",
                grocerySections: {},
                recipes: {},
                shoppingList: {
                    _id: -1,
                    grocerySectionIngredientsMap: new DefaultDict(Array), //dont want key errors
                },
                creatingShoppingList: false,
                error: null,
                postMessage: "",
            };
        // Log user in by saving user name and setting logged in = true
        case "LOG_USER_IN":
            state.loggedIn = true;
            return {
                ...state,
                loggedIn: state.loggedIn,
                username: action.payload,
            };

        //////////////////////////////////////////////////////////////
        // RECIPES
        // Build recipe map for saved recipes in action.payload
        // addToShoppingList, editing not saved in db
        case "GET_RECIPES":
            let recipeMap = {};
            action.payload.forEach((recipe) => {
                recipe.addToShoppingList = false;
                recipe.editing = false;
                recipeMap[recipe._id] = recipe;
            });
            return {
                ...state,
                recipes: recipeMap,
            };

        //Delete recipe with id == action.payload
        case "DELETE_RECIPE":
            delete state.recipes[action.payload];
            return {
                ...state,
                recipes: state.recipes,
            };

        //Add recipe contained in action.payload
        case "ADD_RECIPE":
            action.payload.recipe.addToShoppingList = false;
            state.recipes[action.payload.recipe._id] = action.payload.recipe;
            state.postMessage = action.payload.scraper === "success" ? "" : "Auto Ingredients:: " + action.payload.scraper;
            return {
                ...state,
                recipes: state.recipes,
                postMessage: state.postMessage,
            };

        //Delete ingredient from recipe._id == action.payload[0]
        //ingredient == action.payload[1]
        case "DELETE_RECIPE_INGREDIENT":
            let index = state.recipes[action.payload[0]].ingredients.indexOf(action.payload[1]);
            if (index !== -1) state.recipes[action.payload[0]].ingredients.splice(index, 1);
            return {
                ...state,
                recipes: state.recipes,
            };

        // Add new ingredient for recipe with _id == action.payload[0]
        // Ingredient == action.payload[1]
        case "ADD_RECIPE_INGREDIENT":
            state.recipes[action.payload[0]].ingredients.push(action.payload[1]);
            return {
                ...state,
                recipes: state.recipes,
            };

        // Set or unset recipe addToShoppingList bool
        case "SET_RECIPE_FOR_SHOPPING_LIST":
            state.recipes[action.payload].addToShoppingList = !state.recipes[action.payload].addToShoppingList;
            return {
                ...state,
                recipes: state.recipes,
            };

        // Save all selected recipe ingredients to shopping list
        // Search for all recipes with addToShoppingList === true
        case "SAVE_RECIPES_ADDED_TO_SHOPPING_LIST":
            Object.entries(state.recipes).forEach(([_id, recipe]) => {
                if (recipe.addToShoppingList === true) {
                    Object.entries(recipe.ingredients).forEach(([index, ingredient]) => {
                        state.shoppingList.grocerySectionIngredientsMap[ingredient.grocerySection].push({
                            _id: ingredient._id,
                            name: ingredient.name,
                            lineThrough: false,
                        });
                    });
                    // Unset to make clear ingredients were added and avoid duplicate button presses
                    recipe.addToShoppingList = false;
                }
            });

            return {
                ...state,
                recipes: state.recipes,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
                creatingShoppingList: false,
            };

        // Save edited recipe
        // action.payload = edited recipe
        case "SAVE_EDITED_RECIPE":
            state.recipes[action.payload._id] = action.payload;
            return {
                ...state,
                recipes: state.recipes,
            };

        case "UPDATE_RECIPE_RATING":
            state.recipes[action.payload._id].rating = action.payload.rating;
            return {
                ...state,
                recipes: state.recipes,
            };
        case "ADD_RECIPE_IMAGE":
            const errors = null;
            if (!action.payload.resdata.success) {
                errors = action.payload.resdata.error;
            } else {
                state.recipes[action.payload.recipeId].recipeDetails.images.unshift({
                    original: action.payload.resdata.imageURL,
                    thumbnail: action.payload.resdata.imageURL,
                });
            }
            return {
                ...state,
                recipes: state.recipes,
                errors: errors,
            };
        //////////////////////////////////////////////////////////////
        // SHOPPINGLIST
        // Add shoppinglist to state
        // action.payload = {grocerySectionIngredientsMap}
        case "GET_SHOPPING_LIST":
            state.grocerySections.sections.forEach((section) => {
                state.shoppingList.grocerySectionIngredientsMap[section] = [];
            });
            if (action.payload.grocerySectionIngredientsMap) {
                Object.keys(action.payload.grocerySectionIngredientsMap).forEach((key) => {
                    state.shoppingList.grocerySectionIngredientsMap[key] = action.payload.grocerySectionIngredientsMap[key];
                });
            }
            state.shoppingList._id = action.payload._id;
            state.shoppingList.userId = action.payload.userId;
            return {
                ...state,
                shoppingList: state.shoppingList,
            };

        // Set or unset shooping list bool
        // if canceling unset all selected recipes
        // action.payload = "cancle" or "save"
        case "SET_CREATE_SHOPPING_LIST_BOOL":
            state.creatingShoppingList = !state.creatingShoppingList;
            if (action.payload === "cancel") {
                Object.keys(state.recipes).forEach((_id) => {
                    state.recipes[_id].addToShoppingList = false;
                });
                return {
                    ...state,
                    recipes: state.recipes,
                    creatingShoppingList: state.creatingShoppingList,
                };
            } else {
                return {
                    ...state,
                    creatingShoppingList: state.creatingShoppingList,
                };
            }

        // Add manually added ingrdient to shopping list section
        // action.payload = [sectionName, ingredient]
        case "ADD_INGREDIENT_TO_SHOPPING_LIST_SECTION":
            state.shoppingList.grocerySectionIngredientsMap[action.payload[0]].push(action.payload[1]);
            return {
                ...state,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };

        // Set line through property for shopping list ingredient
        // action.payload = [sectionName, index, value]
        case "SET_INGREDIENT_LINE_THROUGH_SHOPPING_LIST":
            state.shoppingList.grocerySectionIngredientsMap[action.payload[0]][action.payload[1]].lineThrough = action.payload[2];
            return {
                ...state,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };
        // Clear shopping list of all ingredients
        case "CLEAR_SHOPPING_LIST":
            Object.keys(state.shoppingList.grocerySectionIngredientsMap).forEach((sectionName) => {
                state.shoppingList.grocerySectionIngredientsMap[sectionName] = [];
            });
            return {
                ...state,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };

        //////////////////////////////////////////////////////////////
        // GROCERYSECTIONS
        // Get grocery sections
        // Save grocery sections to state
        case "GET_GROCERY_SECTIONS":
            return {
                ...state,
                grocerySections: action.payload,
            };

        // Add new grocery section
        // action.payload = grocery section name
        case "ADD_GROCERY_SECTION":
            state.grocerySections.sections.push(action.payload);
            // Force default dict to intalize entry
            if (state.shoppingList.grocerySectionIngredientsMap[action.payload]) {
            }

            return {
                ...state,
                grocerySections: state.grocerySections,
                shoppingList: state.shoppingList,
            };

        // delete grocery section
        // If shopping list or recipes contain ingredients for the deleted section update them to default section
        // action.payload = section name
        case "DELETE_GROCERY_SECTION":
            let defaultSection = state.grocerySections.default;
            let sectionName = action.payload;

            let sectionIndex = state.grocerySections.sections.indexOf(sectionName);
            if (sectionIndex !== -1) state.grocerySections.sections.splice(sectionIndex, 1);
            Object.entries(state.recipes).forEach(([_id, recipe]) => {
                recipe.ingredients.forEach((ingredient) => {
                    if (ingredient.grocerySection === sectionName) {
                        ingredient.grocerySection = defaultSection;
                    }
                });
            });
            state.shoppingList.grocerySectionIngredientsMap[defaultSection].push(...state.shoppingList.grocerySectionIngredientsMap[sectionName]);
            delete state.shoppingList.grocerySectionIngredientsMap[sectionName];
            return {
                ...state,
                recipes: state.recipes,
                grocerySections: state.grocerySections,
                shoppingList: state.shoppingList,
            };

        // Set grocery sectin default
        // action.payload = section name
        case "SET_GROCERY_SECTION_DEFAULT":
            state.grocerySections.default = action.payload;
            return {
                ...state,
                grocerySections: state.grocerySections,
            };

        //ERRORS
        case "LOGIN_ERROR":
            console.log("Login " + action.payload);
            return {
                ...state,
                error: action.payload,
            };
        case "RECIPE_ERROR":
            console.log("Recipe " + action.payload);
            return {
                ...state,
                error: action.payload,
            };
        case "SETTINGS_ERROR":
            console.log("Settings " + action.payload);
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
