import React from "react";
import styled from "styled-components";

// Styled Components
const Button = styled.button`
    cursor: pointer;
    background-color: ${(props) => (props.clicked === true ? "#8171d1" : "#9c88ff")};
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: flex;
    align-items: center;
    padding: 5px 60px;
    font-size: 25px;

    &:hover {
        background-color: #8171d1;
    }
`;

const Div = styled.div`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
/*
    SUMMARY:
        If user attempts to access a route that does not exit display page

    PARAMS: 

*/
export const NotFound = ({ history }) => {
    return (
        <Div>
            <h2>404! Not Found.</h2>
            <Button seperate onClick={() => history.push("/")}>
                Home
            </Button>
        </Div>
    );
};
