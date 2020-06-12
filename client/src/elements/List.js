import styled from "styled-components";

export default styled.li`
    background-color: #fff;
    box-shadow: ${(props) =>
        props.isShoppingList || props.isGrocerySection || props.isIngredient
            ? "0 1px 3px rgba(0, 0, 0, .5), 0 1px 2px rgba(0, 0, 0, .5)"
            : "var(--box-shadow)"};
    color: #333;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: ${(props) => (props.isShoppingList ? "2.5px 5px 2.5px 5px" : props.isRecipe ? "0" : "10px")};
    margin: ${(props) => (props.isShoppingList || props.isGrocerySection || (props.isIngredient && !props.isForm) ? "" : "10px 0px")};
    width: ${(props) => (props.isIngredient ? "90%" : "")};
    float: ${(props) => (props.isIngredient ? "right" : "")};
    border-right: ${(props) => (props.isRecipe ? (props.ingredientCount > 0 ? "5px solid #2ecc71" : "5px solid #c0392b;") : "")};
    list-style-type: ${(props) => (props.isRecipe ? "none" : "")};
`;
