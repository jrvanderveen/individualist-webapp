export default (state, action) => {
    switch (action.type) {
        // Build recipe map for saved recipes
        case "GET_RECIPES":
            var recipeMap = {};
            action.payload.forEach((recipe) => {
                recipe.forShoppingList = false;
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
            action.payload.forShoppingList = false;
            state.recipes[action.payload._id] = action.payload;
            return {
                ...state,
                recipes: state.recipes,
            };

        //Delete ingredient from recipe._id == action.payload[0]
        //ingredient == action.payload[1]
        case "DELETE_RECIPE_INGREDIENT":
            var index = state.recipes[action.payload[0]].ingredients.indexOf(action.payload[1]);
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
            return {
                ...state,
                creatingShoppingList: state.creatingShoppingList,
            };

        // Set or unset recipe forShoppingList bool
        case "SET_RECIPE_FOR_SHOPPING_LIST":
            state.recipes[action.payload].forShoppingList = !state.recipes[action.payload].forShoppingList;
            return {
                ...state,
                recipes: state.recipes,
            };

        // case "SET_EDIT_BOOL":
        //     state.editing = !state.editing;
        //     return {
        //         ...state,
        //         editing: state.editing,
        //     };

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
            var index = state.grocerySections.sections.indexOf(action.payload);
            if (index !== -1) state.grocerySections.sections.splice(index, 1);
            return {
                ...state,
                grocerySections: state.grocerySections,
            };

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
