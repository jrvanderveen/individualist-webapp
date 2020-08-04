import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
    color: blue;
    &:hover {
        cursor: pointer;
    }
`;

/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 
        setLogInStateFunc: switch between sign in and sign up form
*/
export const SignUp = ({ setLogInStateFunc }) => {
    // State
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [userNamePlaceHolder, setUserNamePlaceHolder] = useState("User name...");

    //Functions
    const onSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "" || repeatPassword === "") {
            return;
        }
        if (password !== repeatPassword) {
            setRepeatPassword("");
            return;
        }
        signUp({ username, email, password, repeatPassword }).then(() => {});
    };

    async function signUp(signUpObj) {
        axios
            .post("/api/login/signup", signUpObj)
            .then((res) => {
                if (!res.data.error) {
                    setLogInStateFunc("login");
                } else {
                    setUserName("");
                    setUserNamePlaceHolder(res.data.error);
                }
            })
            .catch((error) => {
                console.log("login error: ");
                console.log(error);
            });
    }

    return (
        <form className="form-signup" onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                {" "}
                Sign Up
            </h1>
            {/* <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button">
                    <span>Sign up with Facebook</span>{" "}
                </button>
            </div>
            <div className="social-login">
                <button className="btn google-btn social-btn" type="button">
                    <span>Sign up with Google+</span>{" "}
                </button>
            </div>

            <p style={{ textAlign: "center" }}>OR</p> */}

            <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder={userNamePlaceHolder}
                required="required"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address..."
                // required="required"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password..."
                required="required"
            />
            <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="form-control"
                placeholder="Repeat Password..."
                required="required"
            />

            <button className="btn btn-primary btn-block">Sign Up</button>
            <Wrapper>
                <span onClick={() => setLogInStateFunc("login")}>Sign in</span>
            </Wrapper>
        </form>
    );
};
