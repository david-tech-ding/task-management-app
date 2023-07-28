import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/auth-form.css";

const CreateAccount = ({ onSetUser, onSetLoggedInUser, loggedInUser }) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    userName: "",
    firstName: "",
    lastName: "",
    jobRole: "",
  });
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleCreateAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const { user } = userCredential;
        updateProfile(auth.currentUser, {
          displayName: `${newUser.userName}`,
        })
          .then(() => console.log(user.displayName))
          .catch((err) => console.log(err));
        onSetLoggedInUser({
          ...loggedInUser,
          id: user.uid,
          userName: user.displayName,
        });
        axios
          .post("/user", { ...newUser })
          .then(
            setNewUser({
              email: "",
              password: "",
              userName: "",
            })
          )
          .catch((err) => console.log(err));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="auth">
      <h2 className="auth-subheading">Create an Account</h2>
      <form className="auth-form">
        <label htmlFor="create-account_email-input">
          Email
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.email}
            type="email"
            name="email"
            id="create-account_email-input"
          />
        </label>
        <label htmlFor="create-account_password-input">
          Password
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.password}
            type="password"
            name="password"
            id="create-account_password-input"
          />
        </label>
        <label htmlFor="create-account_username-input">
          Username
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.userName}
            type="userName"
            name="userName"
            id="create-account_username-input"
          />
        </label>
        <label htmlFor="create-account_firstname-input">
          First Name
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.firstName}
            type="firstName"
            name="firstName"
            id="create-account_firstname-input"
          />
        </label>
        <label htmlFor="create-account_lastname-input">
          Last Name
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.lastName}
            type="lastName"
            name="lastName"
            id="create-account_lastname-input"
          />
        </label>
        <label htmlFor="create-account_jobrole-input">
          Job Role
          <input
            className="auth-form_input"
            onChange={handleChange}
            value={newUser.jobRole}
            type="jobRole"
            name="jobRole"
            id="create-account_jobrole-input"
          />
        </label>
        <button
          id="create-user_button"
          type="button"
          onClick={handleCreateAccount}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
