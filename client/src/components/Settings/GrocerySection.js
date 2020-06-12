import React, { useContext } from "react";
import { List, Wrapper } from "../../elements/index";
import { GlobalContext } from "../../context/GlobalState";

export const GrocerySection = ({ sectionLabel, _id }) => {
    const { deleteGrocerySection } = useContext(GlobalContext);
    return (
        <Wrapper>
            <List isGrocerySection>
                <h5>{sectionLabel}</h5>
                <button className="float-right btn btn-danger btn-sm" onClick={() => deleteGrocerySection(_id, sectionLabel)}>
                    &times;
                </button>
            </List>
        </Wrapper>
    );
};
