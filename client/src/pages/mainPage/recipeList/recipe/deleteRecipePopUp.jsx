import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/globalState";
import styled from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.25);
`;

const ContentWrapper = styled.div`
    background-color: white;
    position: absolute;
    top: 30%;
    left: 40%;
    width: 20%;
    @media (max-width: 900px) {
        left: 35%;
        width: 30%;
    }
    @media (max-width: 550px) {
        left: 25%;
        width: 50%;
    }
    padding: 20px;
    border-radius: 5px;
    border: 2px solid black;
`;

const Button = styled.button`
    cursor: pointer;
    background-color: #9c88ff;
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: block;
    font-size: "16px";
    margin-bottom: ${(props) => (props.isTop ? "10px" : "")};
    padding: 10px;
    width: 100%;
`;

/*
    SUMMARY:
        Confirm recipe delete
    PARAMS: 


*/
export const DeleteRecipePopUp = ({ togglePopUpFunc, recipeId }) => {
    const { deleteRecipe } = useContext(GlobalContext);
    //functions
    const onConfirm = () => {
        deleteRecipe(recipeId);
        togglePopUpFunc();
    };

    const onCancel = () => {
        togglePopUpFunc();
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Button isTop onClick={onConfirm}>
                    Delete Recipe
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </ContentWrapper>
        </Wrapper>
    );
};
