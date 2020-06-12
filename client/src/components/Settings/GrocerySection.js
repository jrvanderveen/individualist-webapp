import React, { useContext } from "react";
import { List, Wrapper } from "../../elements/index";
import { GlobalContext } from "../../context/GlobalState";

import styled from "styled-components";

const ButtonWrapper = styled.div`
    float: right;
`;

const Label = styled.label`
    margin-right: 10px;
    color: blue;
`;

const Input = styled.input`
    margin-right: 10px;
`;

export const GrocerySection = ({ sectionLabel, _id, isDefault, setErrorsFunc, defaultSection }) => {
    const { deleteGrocerySection, setDefaultGrocerySection } = useContext(GlobalContext);

    const handleOnChange = () => {
        // Only let them select a new default
        if (isDefault) {
            return;
        }
        setDefaultGrocerySection(_id, sectionLabel);
    };

    const handleOnClick = () => {
        if (isDefault) {
            setErrorsFunc(["Cannot delete default section."]);
            return;
        }
        setErrorsFunc([]);
        deleteGrocerySection(_id, sectionLabel, defaultSection);
    };

    return (
        <Wrapper>
            <List isGrocerySection>
                <h5>{sectionLabel}</h5>
                <ButtonWrapper>
                    {isDefault ? <Label>Default</Label> : null}
                    <Input type="checkbox" checked={isDefault ? true : false} onChange={handleOnChange} />
                    <button className="float-right btn btn-danger btn-sm" onClick={handleOnClick}>
                        &times;
                    </button>
                </ButtonWrapper>
            </List>
        </Wrapper>
    );
};
