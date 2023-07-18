import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignIn = ({ onSetUser }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleCreateAccount = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
      .then((userCredential) => {
        const { user } = userCredential;
        onSetUser(user.uid);
        navigate("/");
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="auth">
      <h2 className="auth-subheading">Sign In</h2>
      <form className="auth-form">
        <label htmlFor="sign-in_email-input">
          Email
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={userLogin.email}
            type="email"
            name="email"
            id="sign-in_email-input"
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
          />
        </label>
        <button id="sign-in_button" type="button" onClick={handleCreateAccount}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
