import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalState";

const Button = styled.button`
    cursor: pointer;
    background-color: ${(props) => (props.clicked === true ? "#8171d1" : "#9c88ff")};
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    font-size: 14px;
    padding: 5px;
    margin: ${(props) => (props.top ? "10px 5px 5px 5px" : "5px 5px 0px 5px")};
    width: 90%;
    opacity: ${(props) => (props.bottom && props.available === false ? 0 : 1)};
    &:hover {
        background-color: #8171d1;
    }
`;

const Div = styled.div`
    position: fixed;
    left: 0px;
    top: 40%;
    max-width: 300px;
`;

export const Options = ({ togglePopUpFunc }) => {
    const { setCreateShoppingListBool, creatingShoppingList, setEditBool, editing } = useContext(GlobalContext);
    return (
        <Div>
            <Button top clicked={editing} onClick={() => setEditBool()}>
                Edit Recipe's
            </Button>
            <Button middle clicked={creatingShoppingList} onClick={() => setCreateShoppingListBool()}>
                Create Shopping List
            </Button>
            <Button bottom available={creatingShoppingList} onClick={togglePopUpFunc}>
                Finalize List
            </Button>
        </Div>
    );
};
