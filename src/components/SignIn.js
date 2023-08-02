import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
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
  const formRef = useRef();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSignIn(e);
    }
  };

  const addEnterKeyPressListener = () => {
    if (userRef.current) {
      userRef.current.addEventListener("keydown", handleEnterKeyPress);
    }
    if (formRef.current) {
      formRef.current.addEventListener("keydown", handleEnterKeyPress);
    }
  };
  const removeEnterKeyPressListener = () => {
    if (userRef.current) {
      userRef.current.removeEventListener("keydown", handleEnterKeyPress);
    }
    if (formRef.current) {
      formRef.current.removeEventListener("keydown", handleEnterKeyPress);
    }
  };
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    removeEnterKeyPressListener();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      const { user } = userCredential;
      axios
        .get(`/user/username/${user.displayName}`)
        .then((response) => {
          onSetLoggedInUser({
            ...loggedInUser,
            id: response.data[0].id,
            userName: user.displayName,
            firstName: response.data[0].firstName,
          });
        })
        .catch((err) => console.log(err));

      setUserLogin("");

      setAuth({
        user: user.email,
        roles: [],
      });
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

    loggedInUser.firstName ? navigate("/") : navigate("/create-user");

    addEnterKeyPressListener();
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
      <form className="auth-form" onSubmit={handleSignIn} ref={formRef}>
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
        <button id="sign-in_button" type="submit" onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default SignIn;
