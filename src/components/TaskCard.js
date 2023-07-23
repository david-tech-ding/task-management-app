import React, { useState } from "react";
import "../styles/taskcard.css";
import Status from "./Status";

const TaskCard = ({ title, priorityLevel, details, dueDate, status }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  const handleSaveComment = (e) => {
    e.preventDefault();
  };

  return (
    <div className="task-card-page">
      <div className="task-card-grid">
        <div className={`task-card ${priorityLevel}`}>
          <div className="task-card_title">{title}</div>
          <div className="task-card_priority_level">
            {priorityLevel}&nbsp;Priority
          </div>
          <div className="task-card_due_date">To be completed by {dueDate}</div>
          <div className="task-card_details">{details}</div>
          <Status className="task-card_status" status={status} />
          <form className="task-card_comments" onSubmit={handleSaveComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
