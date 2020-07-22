import styled from "styled-components";

export default styled.div`
    margin-bottom: ${(props) => (props.isRecipe ? "10px" : "0px")};
    /* position: relative; */
    ${(props) =>
        props.isGrocerySection &&
        `
        display: block;
        float: right;
    `}
`;
