import styled from "styled-components";
import { AccordionButton } from "./index";

export default styled.li`
    background-color: ${(props) => (props.active ? "#ccc" : "#f7f7f7")};
    box-shadow: ${(props) =>
        props.isShoppingList || props.isGrocerySection || props.isIngredient
            ? "0 1px 3px rgba(0, 0, 0, .5), 0 1px 2px rgba(0, 0, 0, .5)"
            : "var(--box-shadow)"};
    color: #333;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: ${(props) => (props.isShoppingList ? "2.5px 5px 2.5px 5px" : props.isRecipe ? "0" : props.isShoppingListIngredient ? "0px" : "10px")};
    margin: ${(props) =>
        props.isShoppingList || props.isGrocerySection || (props.isIngredient && !props.isForm)
            ? ""
            : props.isShoppingListIngredient
            ? "5px 0px"
            : props.isRecipe
            ? "5px 0px"
            : "10px 0px"};
    width: ${(props) => (props.isIngredient ? "90%" : props.isRecipe ? "100%" : "")};
    float: ${(props) => (props.isIngredient ? "right" : "")};
    border-right: ${(props) =>
        props.isRecipe || props.isGrocerySectionHeader ? (props.ingredientCount > 0 ? "5px solid #2ecc71" : "5px solid #c0392b;") : ""};
    list-style-type: ${(props) => (props.isRecipe ? "none" : "")};

    ${AccordionButton}:hover & {
        background-color: #ccc;
    }
    line-height: ${(props) => (props.isRecipe ? "1.25" : "")};
    min-height: ${(props) => (props.isRecipe ? "50px" : "")};
    align-items: center;
    /* word-break: break-all; */
`;
