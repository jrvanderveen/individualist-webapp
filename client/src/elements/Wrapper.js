import styled from "styled-components";

export default styled.div`
    position: relative;
    ${(props) =>
        props.grocerySection &&
        `
        display: block;
        float: right;
        position: relative;
        z-index: 100;    
    `}
`;
