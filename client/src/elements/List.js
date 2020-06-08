import styled from "styled-components";

export default styled.li`
    background-color: #fff;
    box-shadow: ${(props) => (props.isShoppingList ? "0 1px 3px rgba(0, 0, 0, .5), 0 1px 2px rgba(0, 0, 0, .5)" : "var(--box-shadow)")};
    color: #333;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: ${(props) => (props.isShoppingList ? "2.5px 5px 2.5px 5px" : "10px")};
    margin: ${(props) => (props.isShoppingList ? "" : "10px 0px")};

    /* Add Recipe Button CSS */
    ${(props) =>
        props.isRecipe &&
        `
        list-style-type: none;
        padding: 0;
    `}

    ${(props) =>
        props.isRecipe & (props.ingredientCount > 0) &&
        `
        border-right: 5px solid #2ecc71;
    `};

    ${(props) =>
        props.isRecipe & (props.ingredientCount < 1) &&
        `
        border-right: 5px solid #c0392b;
    `};

    ${(props) =>
        props.isIngredient &&
        `
        background-color: #fff;
        box-shadow: var(--box-shadow);
        color: #333;
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 10px;
        margin: 10px 0;
        width: 90%;
        float: right;
    `}
`;
