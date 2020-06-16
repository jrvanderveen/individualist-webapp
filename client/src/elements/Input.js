import styled from "styled-components";

export default styled.input`
    border: 1px solid #dedede;
    border-radius: 2px;
    display: block;
    font-size: 16px;
    padding: ${(props) => (props.isShoppingListIngredient ? "5px" : "10px")};
    width: 100%;
    margin-right: ${(props) => (props.isGrocerySection || props.isShoppingListIngredient ? "10px" : "0px")};
`;
