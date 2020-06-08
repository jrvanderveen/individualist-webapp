import styled from "styled-components";

export default styled.div`
    position: relative;
    ${(props) =>
        props.grocerySection &&
        `
        display: block;
        float: right;
    `}
`;
