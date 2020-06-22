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
    const [userName, setUserName] = useState("a");
    const [email, setEmail] = useState("a@gmail");
    const [password, setPassword] = useState("a");
    const [repeatPassword, setRepeatPassword] = useState("a");

    //Functions
    const onSubmit = (e) => {
        e.preventDefault();
        if (userName === "" || email === "" || password === "" || repeatPassword === "") {
            return;
        }
        if (password !== repeatPassword) {
            setRepeatPassword("");
            return;
        }
        signUp({ userName, email, password }).then(() => {});
    };

    async function signUp(signUpObj) {
        console.log("sign up");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios
                .post("/api/v1/login/signup", signUpObj, config)
                .then((res) => {
                    console.log(res);
                    setLogInStateFunc("login");
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } catch (error) {}
    }

    return (
        <form className="form-signup" onSubmit={onSubmit}>
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button">
                    <span>Sign up with Facebook</span>{" "}
                </button>
            </div>
            <div className="social-login">
                <button className="btn google-btn social-btn" type="button">
                    <span>Sign up with Google+</span>{" "}
                </button>
            </div>

            <p style={{ textAlign: "center" }}>OR</p>

            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder="User name..."
                required="required"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address..."
                required="required"
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
                <span onClick={() => setLogInStateFunc("login")}>Sign In</span>
            </Wrapper>
        </form>
    );
};
