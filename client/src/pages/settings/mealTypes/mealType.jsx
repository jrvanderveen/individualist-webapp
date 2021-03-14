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
        Display meal type name and whether its default.
        Allow delete meal type        

    PARAMS: 
        typeLabel: meal type name
        isDefault: is default meal type
        setErrorsFunc: errors to display if failed new meal type validation
        defaultType: default meal type name

*/
export const MealType = ({ typeLabel, isDefault, setErrorsFunc, defaultType }) => {
    const { deleteMealType, setDefaultMealType } = useContext(GlobalContext);

    const handleOnChange = () => {
        // Only let them select a new default
        if (isDefault) {
            return;
        }
        setDefaultMealType(typeLabel);
    };

    const handleOnClick = () => {
        if (isDefault) {
            setErrorsFunc(["Cannot delete default meal type."]);
            return;
        }
        setErrorsFunc([]);
        deleteMealType(typeLabel, defaultType);
    };

    return (
        <Wrapper>
            <List isMealType>
                <H5>{typeLabel}</H5>
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
