import React from "react";
import { Options } from "../components/Settings/Options";
import { SetGrocerySections } from "../components/Settings/SetGrocerySections";
import styled from "styled-components";

const Container = styled.section`
    margin: 30px auto;
    width: 600px;
`;

export const Settings = () => {
    return (
        <>
            <Container>
                <Options />
                <SetGrocerySections />
            </Container>
        </>
    );
};
