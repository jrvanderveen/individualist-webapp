export default (state, action) => {
    switch (action.type) {
        case "GET_RECIPES":
            // Build recipe map for saved recipes
            var recipeMap = {};
            action.payload.forEach((recipe) => {
                recipe.forShoppingList = false;
                recipeMap[recipe._id] = recipe;
            });
            return {
                ...state,
                recipes: recipeMap,
            };
        case "DELETE_RECIPE":
            //Delete recipe with id == action.payload
            delete state.recipes[action.payload];
            return {
                ...state,
                recipes: state.recipes,
            };
        case "ADD_RECIPE":
            //Add recipe contained in action.payload
            action.payload.forShoppingList = false;
            state.recipes[action.payload._id] = action.payload;
            return {
                ...state,
                recipes: state.recipes,
            };
        case "DELETE_RECIPE_INGREDIENT":
            //Delete ingredient from recipe._id == action.payload[0]
            //ingredient == action.payload[1]
            var index = state.recipes[action.payload[0]].ingredients.indexOf(action.payload[1]);
            if (index !== -1) state.recipes[action.payload[0]].ingredients.splice(index, 1);
            return {
                ...state,
                recipes: state.recipes,
            };
        case "ADD_RECIPE_INGREDIENT":
            // Add new ingredient for recipe with _id == action.payload[0]
            // Ingredient == action.payload[1]
            state.recipes[action.payload[0]].ingredients.push(action.payload[1]);
            return {
                ...state,
                recipes: state.recipes,
            };
        case "SET_RECIPE_FOR_SHOPPING_LIST":
            state.recipes[action.payload].forShoppingList = !state.recipes[action.payload].forShoppingList;
            return {
                ...state,
                recipes: state.recipes,
            };
        case "RECIPE_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
