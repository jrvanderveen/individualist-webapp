export default (state, action) => {
    switch (action.type) {
        // Build recipe map for saved recipes
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
            action.payload.addToShoppingList = false;
            state.recipes[action.payload._id] = action.payload;
            return {
                ...state,
                recipes: state.recipes,
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

        // Set or unset shooping list bool
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
        //Get the currently saved shoppinglist and add to state
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
            return {
                ...state,
                shoppingList: state.shoppingList,
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
                        state.shoppingList.grocerySectionIngredientsMap[ingredient.grocerySection].push({ _id: ingredient._id, name: ingredient.name });
                    });
                    // Unset to make clear ingredients were added and avoid duplicate button presses
                    recipe.addToShoppingList = false;
                }
            });

            return {
                ...state,
                recipes: state.recipes,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };

        // Add manually enteres ingredient to section
        // payload = [sectionName, ingredient]
        case "ADD_INGREDIENT_TO_SHOPPING_LIST_SECTION":
            state.shoppingList.grocerySectionIngredientsMap[action.payload[0]].push(action.payload[1]);
            return {
                ...state,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };

        case "CLEAR_SHOPPING_LIST":
            Object.keys(state.shoppingList.grocerySectionIngredientsMap).forEach((sectionName) => {
                state.shoppingList.grocerySectionIngredientsMap[sectionName] = [];
            });
            return {
                ...state,
                grocerySectionIngredientsMap: state.shoppingList.grocerySectionIngredientsMap,
            };
        // Get grocery sections
        case "GET_GROCERY_SECTIONS":
            return {
                ...state,
                grocerySections: action.payload,
            };

        // Add new grocery section
        case "ADD_GROCERY_SECTION":
            state.grocerySections.sections.push(action.payload);
            return {
                ...state,
                grocerySections: state.grocerySections,
            };

        // delete grocery section
        case "DELETE_GROCERY_SECTION":
            let sectionIndex = state.grocerySections.sections.indexOf(action.payload);
            if (sectionIndex !== -1) state.grocerySections.sections.splice(sectionIndex, 1);
            Object.entries(state.recipes).forEach(([_id, recipe]) => {
                recipe.ingredients.forEach((ingredient) => {
                    if (ingredient.grocerySection === action.payload) {
                        ingredient.grocerySection = state.grocerySections.default;
                    }
                });
            });
            return {
                ...state,
                recipes: state.recipes,
                grocerySections: state.grocerySections,
            };
        case "SET_GROCERY_SECTION_DEFAULT":
            state.grocerySections.default = action.payload;
            return {
                ...state,
                grocerySections: state.grocerySections,
            };

        // Save edited recipe
        case "SAVE_EDITED_RECIPE":
            state.recipes[action.payload._id] = action.payload;
            console.log(action.payload);
            return {
                ...state,
                recipes: state.recipes,
            };

        //ERRORS
        case "RECIPE_ERROR":
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
            };
        case "SETTINGS_ERROR":
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
