import React from "react";
import styled from "styled-components";

// Styled Components
const Div = styled.div`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
/*
    SUMMARY:
        If user attempts to access a route that does not exit display page

    PARAMS: 

*/
export const NotFound = () => {
    return (
        <Div>
            <h2>404! Not Found.</h2>
        </Div>
    );
};
