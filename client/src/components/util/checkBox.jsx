import React from "react";
import styled from "styled-components";

const Div = styled.div`
    margin-right: 30px;
`;

/*
    SUMMARY:
        Check box svg       

    PARAMS: 

*/
export const CheckBox = () => {
    return (
        <Div className="form-check">
            <label>Default</label>
            <input type="checkbox" />
        </Div>
    );
};
