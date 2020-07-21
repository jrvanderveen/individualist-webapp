import React, { useContext } from "react";
import { GlobalContext } from "../../../context/globalState";
import { List, Wrapper } from "../../../elements/index";
import styled from "styled-components";

// Styled components
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

const H5 = styled.h5`
    max-width: 80%;
`;

/*
    SUMMARY:
        Display grocery section name and whether its default.
        Allow delete section        

    PARAMS: 
        sectionLabel: grocery section name
        _id: shoppingList._id
        isDefault: is default grocery section
        setErrorsFunc: errors to display if failed new section validation
        defaultSection: default section name

*/
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
                <H5>{sectionLabel}</H5>
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
