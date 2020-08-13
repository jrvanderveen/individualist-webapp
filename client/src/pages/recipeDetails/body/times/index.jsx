import React, { useState, useContext } from "react";
import { DropDownButton } from "./dropDown";
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
`;

const TimesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    margin-right: 15vw;
`;

const OtherDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
`;

const Span = styled.span`
    float: right;
    margin: 0px 5px 0px 5px;
    color: blue;
    font-size: 75%;
    &:hover {
        cursor: pointer;
    }
`;
const EditDiv = styled.div`
    height: 20px;
    width: 100%;
`;

const EditVarDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`;

const Input = styled.input`
    margin-left: 5px;
    border: 1px solid #dedede;
    border-radius: 5px;
    max-width: 50px;
`;

/*
    SUMMARY:
        Display:
            cooktime
            preptime
            dificulty
            servings
    PARAMS: 
    
*/

export const Times = (props) => {
    //Variables
    const { _id, prepTime, cookTime, servings, dificulty } = props;
    const difcultyOptions = ["Easy", "Medium", "Hard"];

    //Context
    const { updateRecipeDetailTimes } = useContext(GlobalContext);
    //State
    const [edit, setEdit] = useState(false);
    const [editPrepTime, setEditPrepTime] = useState(prepTime);
    const [editCookTime, setEditCookTime] = useState(cookTime);
    const [editServings, setEditServings] = useState(servings);
    const [editDificulty, setEditDificulty] = useState(dificulty);

    //Functions
    const handleClick = (val) => {
        if (val === "edit") {
            setEdit(true);
        } else {
            if (val === "save") {
                console.log("save");
                updateRecipeDetailTimes(_id, { prepTime: editPrepTime, cookTime: editCookTime, servings: editServings, dificulty: editDificulty });
            }
            setEdit(false);
        }
    };

    return (
        <>
            {edit === true ? (
                <EditDiv>
                    <Span onClick={() => handleClick("save")}>Save</Span>
                    <Span onClick={() => handleClick("cancel")}>Cancel</Span>{" "}
                </EditDiv>
            ) : (
                <EditDiv>
                    <Span onClick={() => handleClick("edit")}>Edit</Span>
                </EditDiv>
            )}
            <MainDiv>
                {edit === true ? (
                    <>
                        <TimesDiv>
                            <EditVarDiv>
                                <span>Prep:</span>
                                <Input type="number" min="0" max="10000" value={editPrepTime} onChange={(e) => setEditPrepTime(e.target.value)} />
                            </EditVarDiv>
                            <EditVarDiv>
                                <span>Cook:</span>
                                <Input type="number" min="0" max="10000" value={editCookTime} onChange={(e) => setEditCookTime(e.target.value)} />
                            </EditVarDiv>
                        </TimesDiv>
                        <OtherDiv>
                            <EditVarDiv>
                                <span>Dificulty:</span>
                                <DropDownButton defaultVal={editDificulty} options={difcultyOptions} updateSelectedFunc={setEditDificulty} />
                            </EditVarDiv>
                            <EditVarDiv>
                                <span>Servings:</span>
                                <Input type="number" min="0" max="10000" value={editServings} onChange={(e) => setEditServings(e.target.value)} />
                            </EditVarDiv>
                        </OtherDiv>
                    </>
                ) : (
                    <>
                        <TimesDiv>
                            <div>Prep: {prepTime} Min</div>
                            <div>Cook: {cookTime} Min</div>
                        </TimesDiv>
                        <OtherDiv>
                            <div>Dificulty: {dificulty}</div>
                            <div>Servings: {servings} </div>
                        </OtherDiv>
                    </>
                )}
            </MainDiv>
        </>
    );
};
