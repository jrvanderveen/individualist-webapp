import React from "react";
import styled from "styled-components";
import { Wrapper } from "../../elements/index";

const Div = styled.div`
    margin-right: 30px;
`;

export const CheckBox = (props) => {
    return (
        <Div className="form-check">
            <label>Default</label>
            <input type="checkbox" />
        </Div>
    );
};
