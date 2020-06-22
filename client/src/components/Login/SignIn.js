import React, { useState } from "react";
import axios from "axios";

/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 
        setLogInStateFunc: switch between sign in and sign up form
*/
export const SignIn = ({ setLogInStateFunc }) => {
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Functions
    const onSubmit = (e) => {
        e.preventDefault();
        signIn({ email, password }).then(() => {});
    };

    async function signIn(signInObj) {
        console.log("sign in");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios
                .post("/api/v1/login/signIn", { signInObj }, config)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } catch (error) {}
    }
    return (
        <form className="form-signin" onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                {" "}
                Sign in
            </h1>
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button">
                    <span>
                        <i className="fab fa-facebook-f"></i> Sign in with Facebook
                    </span>{" "}
                </button>
                <button className="btn google-btn social-btn" type="button">
                    <span>
                        <i className="fab fa-google-plus-g"></i> Sign in with Google+
                    </span>{" "}
                </button>
            </div>
            <p style={{ textAlign: "center" }}> OR </p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address..."
                required="required"
                autoFocus
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password..."
                required="required"
            />

            <button className="btn btn-success btn-block" type="submit">
                <i className="fas fa-sign-in-alt"></i> Sign in
            </button>
            <hr />
            <button className="btn btn-primary btn-block" onClick={() => setLogInStateFunc("signup")}>
                Sign up New Account
            </button>
        </form>
    );
};
