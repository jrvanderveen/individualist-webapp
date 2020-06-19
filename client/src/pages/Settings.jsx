import React, { useState } from "react";
import { Options } from "../components/Settings/Options";
import { SetUpGrocerySections } from "../components/Settings/SetUpGrocerySections";
import { UserSettings } from "../components/Settings/UserSettings";
import styled from "styled-components";

// Styled Components
const Container = styled.section`
    margin: 30px auto;
    width: 600px;
`;

/*
    SUMMARY:
        Page to allow user to update user preferences and add/delete grocery sections

    PARAMS: 

*/
export const Settings = () => {
    const settingsMap = { "Grocery Store Sections": <SetUpGrocerySections />, "User Settings": <UserSettings /> };
    const [activeOption, setActiveOption] = useState("Grocery Store Sections");
    return (
        <>
            <Container>
                <Options settingLabels={Object.keys(settingsMap)} selectSettingPage={setActiveOption} />
                {settingsMap[activeOption]}
            </Container>
        </>
    );
};
