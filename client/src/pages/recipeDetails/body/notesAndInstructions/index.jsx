import React, { useState, useContext, useRef, useEffect } from "react";
import { Options } from "./options";
import { GlobalContext } from "../../../../context/globalState";
import styled from "styled-components";

// Styled components
const MainDiv = styled.div`
    padding: 11px 10px;
    border: 1px solid rgba(0, 0, 0, 0.29);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: pre-wrap;
    min-height: 100px;
`;

const Span = styled.span`
    margin: 0px 5px 0px 5px;
    color: blue;
    font-size: 75%;
    &:hover {
        cursor: pointer;
    }
`;
const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const TextArea = styled.textarea`
    width: 100%;
    white-space: pre-wrap;
`;
/*
    SUMMARY:selected
        Display recipe ingredients on details page

    PARAMS: 
        _id: recipe ID

*/
export const NotesAndInstructions = ({ _id, notes, instructions }) => {
    //Context
    const { updateRecipeDetailsNotes, updateRecipeDetailsInstructions } = useContext(GlobalContext);

    //State
    const [selected, setSelected] = useState("instructions");
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(instructions);
    const [initialLoad, setInitialLoad] = useState(true);
    //Ref
    const divRef = useRef(null);

    //Functions
    const handleOptionChange = (option) => {
        setSelected(option);
        if (option === "instructions") {
            setEditText(instructions);
        } else {
            setEditText(notes);
        }
        console.log("SCroll to bottom");
    };

    const handleClick = (val) => {
        if (val === "edit") {
            setEdit(true);
        } else {
            if (val === "save") {
                if (selected === "instructions") {
                    updateRecipeDetailsInstructions(_id, editText);
                } else {
                    updateRecipeDetailsNotes(_id, editText);
                }
            }
            setEdit(false);
        }
    };

    const scrollToDivRef = () => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!initialLoad) {
            scrollToDivRef();
        } else {
            setInitialLoad(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <>
            <Header>
                <Options handleOptionChangeFunc={handleOptionChange} selected={selected} />
                <div>
                    {edit === true ? (
                        <>
                            <Span onClick={() => handleClick("save")}>Save</Span>
                            <Span onClick={() => handleClick("cancel")}>Cancel</Span>{" "}
                        </>
                    ) : (
                        <>
                            <Span onClick={() => handleClick("edit")}>Edit</Span>
                        </>
                    )}
                </div>
            </Header>
            <MainDiv>
                {edit === true ? (
                    <TextArea name={selected} rows="10" onChange={(e) => setEditText(e.target.value)} value={editText} />
                ) : (
                    <>{selected === "instructions" ? instructions : notes}</>
                )}
            </MainDiv>
            <div ref={divRef} />
        </>
    );
};
