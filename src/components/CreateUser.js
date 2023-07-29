import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/create-user.css";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("MyFile", selectedFile, selectedFile.name);
    console.log(selectedFile);
  };

  const handleCreateUser = (e) => {

    e.preventDefault();
    if (firstName && lastName && jobRole) {
      axios
        .post("/user", {
          firstName,
          lastName,
          jobRole,
        })
        .then((res) => {
          setFirstName("");
          setLastName("");
          setJobRole("");
        })
        .catch((err) => {
          console.log("Error creating user:", err);
        });
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
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button type="submit" onSubmit={handleFileUpload}>
        Upload
      </button>
      <button onClick={handleCreateUser}>Create User</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default CreateUser;
