import styled from "styled-components";

export default styled.input`
    border: 1px solid #dedede;
    border-radius: 5px;
    display: ${(props) => (props.isRecipeWebsite ? "" : "block")};
    font-size: 16px;
    padding: ${(props) =>
        props.isShoppingListIngredient || props.isRecipeServings ? "5px 0px 5px 5px" : props.isRecipeWebsite ? "2.5px" : "10px 0px 10px 10px"};
    width: ${(props) => (props.isRecipeServings ? "45px" : props.isRecipeWebsite ? "50%" : "100%")};
    margin-right: 10px;
    float: ${(props) => props.isRecipeServings && "right"};
`;
