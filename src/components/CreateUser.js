import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/create-user.css";

const CreateUser = ({ onSetLoggedInUser, user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const navigate = useNavigate();

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
  };
  return (
    <div className="create-user">
      <h2>Finish setting up your account:</h2>
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
    </div>
  );
};

export default CreateUser;
