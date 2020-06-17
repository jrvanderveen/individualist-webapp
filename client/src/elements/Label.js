import styled from "styled-components";

export default styled.label`
    display: inline-block;
    margin: ${(props) => (props.isRecipeServings ? "10px 5px" : "10px 0px")};
`;
