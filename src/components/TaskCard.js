import React, { useState } from "react";
import "../styles/taskcard.css";
import Status from "./Status";

const TaskCard = ({ title, priorityLevel, details, dueDate, status }) => {
  const [comments, setComments] = useState([]);
  const [newStatus, setNewStatus] = useState({ status });

  const handleChange = (e) => {
    e.preventDefault();
    setComments(e.target.value);
  };
  const handleSaveComment = (e) => {
    e.preventDefault();
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    setNewStatus(e.target.value);
  };

  return (
    <div className="task-card-page">
      <div className="task-card-grid">
        <div className={`task-card ${priorityLevel}`}>
          <div className="task-card_title">{title}</div>
          <div className="task-card_priority_level">
            {priorityLevel}&nbsp;Priority
          </div>
          <div className="task-card_due_date">Due on {dueDate}</div>
          <div className="task-card_details">{details}</div>
          <Status className="task-card_status" status={newStatus} />
          <form className="task-card_form">
            <select className="status-select" id="status-select">
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <button type="submit" onSubmit={handleStatusChange}>
              Change Status
            </button>
            <input
              type="text"
              placeholder="Write a comment..."
              value={comments}
              onChange={handleChange}
            />
            <button type="submit" onSubmit={handleSaveComment}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
