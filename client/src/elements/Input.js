import styled from "styled-components";

export default styled.input`
    border: 1px solid #dedede;
    border-radius: 2px;
    display: block;
    font-size: 16px;
    padding: 10px;
    width: ${(props) => (props.isIngredient ? "75%" : "100%")};
    margin-right: ${(props) => (props.isIngredient ? "10px" : "0px")};
    float: ${(props) => (props.isIngredient ? "left" : "")};
`;
