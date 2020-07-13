import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Redirect } from "react-router-dom";

/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 
        setLogInStateFunc: switch between sign in and sign up form
*/
export const SignIn = ({ setLogInStateFunc }) => {
    // Context
    const { signIn } = useContext(GlobalContext);

    // State
    const [username, setUserName] = useState("");
    const [placeholder, setPlaceHolder] = useState("username");
    const [password, setPassword] = useState("");

    // Functions
    const onSubmit = (e) => {
        e.preventDefault();
        signIn({ username: username, password: password }).then((result) => {
            if (!result) {
                setUserName("");
                setPlaceHolder("invalid user/password");
                setPassword("");
            } else {
                return <Redirect to="/" />;
            }
        });
    };
    return (
        <form className="form-signin" onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                {" "}
                Sign in
            </h1>
            {/* <div className="social-login">
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
            <p style={{ textAlign: "center" }}> OR </p>*/}
            <input
                type="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder={placeholder}
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
