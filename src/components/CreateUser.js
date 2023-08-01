import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/create-user.css";

const CreateUser = ({ onSetLoggedInUser, user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const navigate = useNavigate();

  const userRef = useRef();
  const formRef = useRef();

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleCreateUser(e);
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    removeEnterKeyPressListener();
    if (firstName && lastName && jobRole) {
      axios
        .patch(`/user/id/${user.id}`, {
          firstName,
          lastName,
          jobRole,
        })
        .then(() => {
          onSetLoggedInUser({ ...user, firstName: firstName });
          setFirstName("");
          setLastName("");
          setJobRole("");
        })
        .catch((err) => {
          console.log("Error creating user:", err);
        });
      navigate("/");
    } else {
      alert("Please fill in the required fields");
    }
    addEnterKeyPressListener();
  };
  return (
    <div className="create-user">
      <h2>Finish setting up your account:</h2>
      <form onSubmit={handleCreateUser} ref={formRef}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            value={jobRole}
            onChange={handleJobRoleChange}
          />
        </div>
        <button onClick={handleCreateUser}>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
