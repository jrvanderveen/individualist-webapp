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
    pointer-events: ${(props) => (props.available === false ? "none" : "")};
`;

const Div = styled.div`
    position: fixed;
    left: 0px;
    top: 40%;
    max-width: 300px;
`;

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    padding: 0px;
`;

const Li = styled.li`
    width: 47.5%;
`;
export const Options = ({ togglePopUpFunc }) => {
    const { setCreateShoppingListBool, creatingShoppingList, saveAddedRecipes } = useContext(GlobalContext);
    return (
        <Div>
            <Button middle clicked={creatingShoppingList} onClick={togglePopUpFunc}>
                View Shopping List
            </Button>
            <Button middle clicked={creatingShoppingList} onClick={() => setCreateShoppingListBool("close")}>
                Add To Shopping List
            </Button>
            <Ul>
                <Li>
                    <Button bottom available={creatingShoppingList} onClick={saveAddedRecipes}>
                        Save
                    </Button>
                </Li>
                <Li>
                    <Button bottom available={creatingShoppingList} onClick={() => setCreateShoppingListBool("cancel")}>
                        Cancel
                    </Button>
                </Li>
            </Ul>
        </Div>
    );
};
