import React from "react";
import styled from "styled-components";
import { Wrapper } from "../../elements/index";

const Div = styled.div`
    opacity: 0;
    transition: opacity 0.3s ease;
    ${Wrapper}:hover & {
        opacity: 1;
    }

    position: absolute;

    top: 0px;
    left: 0px;
    transform: translate(0%, 150%);
`;

export const CheckBox = (props) => {
    return (
        <Div className="form-check">
            <input type="checkbox" className="form-check-input" id="materialUnchecked" />
            <label className="form-check-label" htmlFor="materialUnchecked"></label>
        </Div>
    );
};
