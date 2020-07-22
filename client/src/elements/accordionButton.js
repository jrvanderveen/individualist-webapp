import styled from "styled-components";

export default styled.span`
    cursor: pointer;
    color: #fff;
    border: 0;
    display: block;
    font-size: 16px;
    background-color: ${(props) => (props.isShoppingList ? "white" : "#f7f7f7")};
    width: 100%;
    line-height: ${(props) => (props.isShoppingList ? "1.25" : "3")};
`;
