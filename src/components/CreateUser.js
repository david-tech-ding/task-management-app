import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/create-user.css";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");

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
    //use API
    console.log("New User Details", {
      firstName,
      lastName,
      jobRole,
    });

    setFirstName("");
    setLastName("");
    setJobRole("");
  };
  return (
    <div className="create-user">
      <h2>Create New User</h2>
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
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default CreateUser;
