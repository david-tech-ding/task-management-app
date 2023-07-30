import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/taskcard.css";

const TaskCard = ({
  title,
  priorityLevel,
  details,
  dueDate,
  status,
  id,
  user,
  assignedBy,
  assignTo,
  usersList,
}) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [comments, setComments] = useState([]);
  const [newStatus, setNewStatus] = useState(status);
  const [assignedUser, setAssignedUser] = useState(assignTo);

  useEffect(() => {
    console.log(usersList);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setComments(e.target.value);
  };
  const handleSaveComment = (e) => {
    e.preventDefault();
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    setNewStatus({ status: e.target.value });
    console.log(newStatus);
  };

  const handleStatusSubmit = async () => {
    axios
      .patch(`/task/${id}`, newStatus)
      .then(console.log(newStatus))
      .catch((err) => console.log(err));
  };

  const handleTaskDelete = async () => {
    axios
      .delete(`/task/${id}`)
      .then(console.log("Task deleted"))
      .catch((err) => console.log(err));
  };

  const handleAssignedUserChange = (e) => {
    e.preventDefault();
    setAssignedUser(e.target.value);
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
          <div className="task-card_status">Status: {status}</div>
          <form className="task-card_form">
            <select
              className="status-select"
              id="status-select"
              onChange={handleStatusChange}
              defaultValue={status}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <button
              className="status-button"
              type="button"
              onClick={handleStatusSubmit}
            >
              Change Status
            </button>
            <input
              className="comments-input"
              type="text"
              placeholder="Write a comment..."
              value={comments}
              onChange={handleChange}
            />
            <div>
              <h3>Assign To</h3>
              <select
                className="assigned-user_select"
                id="assigned-user_select"
                onChange={handleAssignedUserChange}
                value={assignedUser}
              >
                {usersList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="comments-button"
              type="submit"
              onSubmit={handleSaveComment}
            >
              Save
            </button>
          </form>
          {assignedBy === user && (
            <button
              className="delete-button"
              type="button"
              onClick={handleTaskDelete}
            >
              Delete Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
