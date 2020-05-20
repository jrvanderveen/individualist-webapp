export default (state, action) => {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                loading: false,
                recipes: action.payload,
            };
        case "DELETE_RECIPE":
            return {
                ...state,
                recipes: state.recipes.filter((recipe) => recipe._id !== action.payload),
            };
        case "ADD_RECIPE":
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
            };
        case "DELETE_RECIPE_INGREDIENT":
            state.recipes.forEach((recipe) => {
                console.log(recipe._id, action.payload[0]);
                if (recipe._id === action.payload[0]) {
                    recipe.ingredients = recipe.ingredients.filter((ingredient) => ingredient !== action.payload[1]);
                }
            });
            return {
                ...state,
                recipes: state.recipes,
            };
        case "ADD_RECIPE_INGREDIENT":
            state.recipes.forEach((recipe) => {
                if (recipe._id === action.payload[0]) {
                    recipe.ingredients = [...recipe.ingredients, action.payload[1]];
                }
            });
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
