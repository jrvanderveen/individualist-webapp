import styled from "styled-components";

export default styled.button`
    cursor: pointer;
    color: #fff;
    border: 0;
    display: block;
    font-size: 16px;
    background-color: ${(props) => (props.active === "active" ? "#ccc" : "#f7f7f7")};
    width: 100%;
    line-height: 3;
    &:hover {
        background-color: #ccc;
    }
`;
