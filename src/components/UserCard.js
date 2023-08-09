import React from "react";

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

const UserCard = (firstName, lastName, jobRole) => {
  return (
    <div className={`user-card`}>
      <div className="task-card_title">
        {firstName}&nbsp;{lastName}
      </div>
      <form className="user-card_form">
        <label htmlFor="jobRole">Job Role:</label>
        <select
          className="create-user_select"
          id="jobRole"
          defaultValue="default"
          value={jobRole}
          onChange={handleJobRoleChange}
        >
          <option value="default" disabled>
            Select your position
          </option>
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
          className="delete-button"
          type="button"
          onClick={handleUserDelete}
        >
          Delete User
        </button>
      </form>
    </div>
  );
};

export default UserCard;
