import React, { useState } from "react";
import { Options } from "../components/Settings/Options";
import { SetGrocerySections } from "../components/Settings/SetGrocerySections";
import { UserSettings } from "../components/Settings/UserSettings";
import styled from "styled-components";

const Container = styled.section`
    margin: 30px auto;
    width: 600px;
`;

export const Settings = () => {
    const settingsMap = { "Grocery Store Sections": <SetGrocerySections />, "User Settings": <UserSettings /> };
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
