import React from "react";
import styled from "styled-components";

// Styled components
const Button = styled.button`
    padding: 5px;
    background: ${(props) => (props.selected ? "#92deff" : "#0FA9CB")};
    border-radius: 5px;
    opacity: ${(props) => (props.selected ? "1" : ".5")};
`;
const H4 = styled.h4`
    margin: 0;
`;
/*
    SUMMARY:
        Header for Recipe Detail Page
    PARAMS: 
    
*/

export const Options = ({ handleOptionChangeFunc, selected }) => {
    return (
        <div>
            <Button selected={selected === "instructions" ? true : false} onClick={() => handleOptionChangeFunc("instructions")}>
                <H4 selected={selected === "instructions" ? true : false}>Instructions</H4>
            </Button>
            <Button selected={selected === "notes" ? true : false} onClick={() => handleOptionChangeFunc("notes")}>
                <H4 selected={selected === "instructions" ? true : false}>Notes</H4>
            </Button>
        </div>
    );
};
