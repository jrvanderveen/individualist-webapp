import styled from "styled-components";

export default styled.h3`
    border-bottom: 1px solid #bbb;
    padding-bottom: 10px;
    margin: ${(props) => (props.addRecipe ? "" : "20px 0 10px")};
`;
