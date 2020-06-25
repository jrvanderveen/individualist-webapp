import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
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
    // State
    const { grocerySections, onStartUp } = useContext(GlobalContext);

    // Functions
    // If reder check if we need to get grocerySections.
    //      if visiting the settings page and returning no update needed
    useEffect(() => {
        if (Object.entries(grocerySections.sections).length === 0) {
            onStartUp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
