import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { H3, List, Input } from "../../elements/index";
import { GrocerySection } from "../../components/Settings/GrocerySection";
import styled from "styled-components";

const Ul = styled.ul`
    padding-left: 3%;
`;

const Wrapper = styled.div`
    margin: auto;
`;

export const SetGrocerySections = () => {
    const { grocerySections, getGrocerySections, addGrocerySection } = useContext(GlobalContext);
    const [grocerySection, setGrocerySection] = useState("");
    const [placeHolderText, setPlaceHolderText] = useState("Enter Grocery Section...");

    useEffect(() => {
        getGrocerySections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnClick = () => {
        if (grocerySection.length === 0) {
            setPlaceHolderText("Enter Grocery Section...");
            return;
        }
        grocerySections.sections.forEach((section) => {
            if (section.toLowerCase() === grocerySection.toLowerCase()) {
                setGrocerySection("");
                setPlaceHolderText("Section Names Must Be Unique");
            }
        });

        addGrocerySection(grocerySections._id, grocerySection);
    };

    return (
        <>
            <H3>Grocery Sections</H3>
            <Ul>
                {grocerySections.sections.map((section) => (
                    <GrocerySection key={section} sectionLabel={section} _id={grocerySections._id} />
                ))}
                <List>
                    <Input isGrocerySection value={grocerySection} onChange={(e) => setGrocerySection(e.target.value)} placeholder={placeHolderText} />
                    <Wrapper>
                        <button className="float-right btn btn-success btn-sm" onClick={handleOnClick}>
                            +
                        </button>
                    </Wrapper>
                </List>
            </Ul>
        </>
    );
};
