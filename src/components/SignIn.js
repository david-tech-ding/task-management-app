import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignIn = ({ onSetLoggedInUser, loggedInUser }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userLogin.email, userLogin.password]);

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      const { user } = userCredential;
      onSetLoggedInUser({
        ...loggedInUser,
        id: user.uid,
        userName: user.displayName,
      });
      setUserLogin("");

      setAuth({
        user: user.email,
        roles: [],
      });

      navigate("/");
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/user-not-found") {
        setErrMsg("User not found");
      } else if (errorCode === "auth/wrong-password") {
        setErrMsg("Wrong password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="auth">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h2 className="auth-subheading">Sign In</h2>
      <form className="auth-form" onSubmit={handleSignIn}>
        <label htmlFor="sign-in_email-input">
          Email
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={userLogin.email}
            type="email"
            name="email"
            id="sign-in_email-input"
            ref={userRef}
            required
          />
        </label>
        <label htmlFor="sign-in_password-input">
          Password
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={userLogin.password}
            type="password"
            name="password"
            id="sign-in_password-input"
            required
          />
        </label>
        <button id="sign-in_button" type="button" onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default SignIn;
