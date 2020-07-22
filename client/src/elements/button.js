import styled from "styled-components";

export default styled.button`
    cursor: pointer;
    background-color: #9c88ff;
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: block;
    font-size: ${(props) => (props.isShoppingListOption ? "12px" : "16px")};
    margin: ${(props) => (props.ingredient ? "10px 0 0px" : props.isShoppingListOption ? "2.5px" : "10px 0 30px")};
    padding: ${(props) => (props.isShoppingListOption ? "2.5px 5px 2.5px 5px" : "10px")};
    width: ${(props) => (props.isShoppingListOption ? "" : "100%")};
    float: ${(props) => (props.isShoppingListOption ? "right" : "")};
`;
