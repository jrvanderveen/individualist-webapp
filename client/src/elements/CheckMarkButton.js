import styled from "styled-components";
import { Wrapper } from "./index";

export default styled.button`
    opacity: ${(props) => (props.available === true ? 1 : 0)};
    transition: opacity 0.3s ease;
    border: none;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(-100%, 175%);
    background: none;
`;
