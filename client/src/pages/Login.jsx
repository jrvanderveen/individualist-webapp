import React, { useState } from "react";
import { SignIn } from "../components/Login/SignIn";
import { SignUp } from "../components/Login/SignUp";

/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 

*/
export const Login = () => {
    const [loginState, setLogInState] = useState("login");

    return (
        <div id="logreg-forms">
            {loginState === "login" ? (
                <SignIn setLogInStateFunc={setLogInState} />
            ) : (
                <SignUp setLogInStateFunc={setLogInState} />
            )}
        </div>
    );
};
