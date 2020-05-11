export default (state, action) => {
    switch (action.type) {
        case "DELETE_RECIPIE":
            return {
                ...state,
                recipies: state.recipies.filter((recipie) => recipie.id !== action.payload),
            };
        case "ADD_RECIPIE":
            return {
                ...state,
                recipies: [action.payload, ...state.recipies],
            };
        case "DELETE_RECIPIE_INGREDIENT":
            state.recipies.forEach((recipie) => {
                if (recipie.id === action.payload[0]) {
                    recipie.ingredients = recipie.ingredients.filter((ingredient) => ingredient !== action.payload[1]);
                }
            });

            return {
                ...state,
                recipies: state.recipies,
            };
        case "ADD_RECIPIE_INGREDIENT":
            state.recipies.forEach((recipie) => {
                if (recipie.id === action.payload[0]) {
                    recipie.ingredients = [...recipie.ingredients, action.payload[1]];
                }
            });
            return {
                ...state,
                recipies: state.recipies,
            };
        default:
            return state;
    }
};
