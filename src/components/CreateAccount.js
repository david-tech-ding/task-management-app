import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/auth-form.css";

const CreateAccount = ({ onSetLoggedInUser, loggedInUser }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const userRef = useRef();
  const formRef = useRef();

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleCreateAccount(e);
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

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    removeEnterKeyPressListener();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        await axios
          .post("/user", { ...newUser })
          .then(
            setNewUser({
              email: "",
              password: "",
              userName: "",
            })
          )
          .catch((err) => console.log(err));
        const { user } = userCredential;
        updateProfile(auth.currentUser, {
          displayName: `${newUser.userName}`,
        })
          .then(() => {
            axios
              .get(`/user/username/${user.displayName}`)
              .then((response) => {
                console.log(response);
                onSetLoggedInUser({
                  ...loggedInUser,
                  id: response.data[0].id,
                  userName: user.displayName,
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
        navigate("/create-user");
      })
      .catch((err) => console.log(err));
    addEnterKeyPressListener();
  };

  return (
    <div className="auth">
      <h2 className="auth-subheading">Create an Account</h2>
      <form className="auth-form" onSubmit={handleCreateAccount} ref={formRef}>
        <label className="auth-form_label" htmlFor="create-account_email-input">
          Email
        </label>
        <input
          className="auth-form_input"
          onChange={handleChange}
          value={newUser.email}
          type="email"
          name="email"
          id="create-account_email-input"
        />

        <label
          className="auth-form_label"
          htmlFor="create-account_password-input"
        >
          Password
        </label>
        <input
          className="auth-form_input"
          onChange={handleChange}
          value={newUser.password}
          type="password"
          name="password"
          id="create-account_password-input"
        />

        <label
          className="auth-form_label"
          htmlFor="create-account_username-input"
        >
          Username
        </label>
        <input
          className="auth-form_input"
          onChange={handleChange}
          value={newUser.userName}
          type="userName"
          name="userName"
          id="create-account_username-input"
        />

        <button
          id="create-user_button"
          type="submit"
          onClick={handleCreateAccount}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
