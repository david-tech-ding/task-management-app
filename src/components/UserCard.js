import React, { useState } from "react";
import axios from "axios";
import "../styles/usercard.css";

const UserCard = ({ firstName, lastName, jobRole, id }) => {
  const jobRoleList = [
    "Clinic Manager",
    "Healthcare Administrator",
    "Doctor",
    "Head Nurse",
    "Junior Doctor",
    "Nurse",
    "Medical Technician",
    "Nutritionist",
    "Pharmacist",
    "Secretary",
  ];

  const [newJobRole, setNewJobRole] = useState(jobRole);

  const handleJobRoleChange = (e) => {
    e.preventDefault();
    setNewJobRole({ jobRole: e.target.value });
  };

  const handleJobRoleSubmit = () => {
    axios
      .patch(`/user/id/${id}`, newJobRole)
      .then(console.log(`jobRole changed to ${newJobRole}`));
  };

  const handleUserDelete = () => {
    axios
      .delete(`/user/${id}`)
      .then(console.log("User deleted!"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-card">
      <div className="user-card_title">
        {firstName}&nbsp;{lastName}
      </div>
      <div>
        <form className="user-card_form">
          <label className="user-card_label" htmlFor="jobRole">
            Job Role
          </label>
          <select
            className="job-role_select"
            id="jobRole"
            defaultValue="default"
            value={jobRole}
            onChange={handleJobRoleChange}
          >
            {jobRoleList.map((jobRole) => {
              return (
                <option value={jobRole} key={jobRole.index}>
                  {jobRole}
                </option>
              );
            })}
            ;
          </select>
          <button
            className="change-job-role_button"
            type="button"
            onClick={handleJobRoleSubmit}
          >
            Change Role
          </button>
          <button
            className="job-role_delete"
            type="button"
            onClick={handleUserDelete}
          >
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCard;
