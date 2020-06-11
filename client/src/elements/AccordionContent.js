import styled from "styled-components";

export default styled.div`
    overflow: ${(props) => (props.maxHeight === "0px" ? "hidden" : "")};
    transition: max-height 0.3s ease;
    height: ${(props) => props.maxHeight};
`;
