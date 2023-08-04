import React, { useState, useEffect, useRef } from "react";
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
  const [newComment, setNewComment] = useState("");
  const [savedComments, setSavedComments] = useState([]);
  const [newStatus, setNewStatus] = useState(status);
  const [assignedUser, setAssignedUser] = useState(assignTo);

  const userRef = useRef();
  const buttonRef = useRef();

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSaveComment(e);
    }
  };

  const addEnterKeyPressListener = () => {
    if (userRef.current) {
      userRef.current.addEventListener("keydown", handleEnterKeyPress);
    }
    if (buttonRef.current) {
      buttonRef.current.addEventListener("keydown", handleEnterKeyPress);
    }
  };
  const removeEnterKeyPressListener = () => {
    if (userRef.current) {
      userRef.current.removeEventListener("keydown", handleEnterKeyPress);
    }
    if (buttonRef.current) {
      buttonRef.current.removeEventListener("keydown", handleEnterKeyPress);
    }
  };

  useEffect(() => {
    axios
      .get(`/comments/${id}`)
      .then((data) => {
        setSavedComments(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleSaveComment = (e) => {
    e.preventDefault();
    removeEnterKeyPressListener();
    axios
      .post("/comments", { comment: newComment, TaskId: id })
      .then((res) => {
        setSavedComments([...savedComments, res.data]);
        setNewComment("");
      })
      .catch((err) => console.log(err));
    addEnterKeyPressListener();
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

  const handleAssignedUserSubmit = () => {
    axios
      .patch(`/task/${id}`, { assignTo: assignedUser })
      .then((res) => {
        console.log("Assigned user updated", res.data);
      })
      .catch((err) => console.log(err));
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
            <div>
              <h3>Comments</h3>
              <ul>
                {savedComments.map((data) => {
                  return <li key={data.id}>{data.comment}</li>;
                })}
              </ul>
            </div>
            <input
              className="comments-input"
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleChange}
            />
            <button
              className="comments-button"
              type="submit"
              onClick={handleSaveComment}
              ref={buttonRef}
            >
              Save
            </button>
          </form>
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
                  {user.firstName}&nbsp;{user.lastName}&nbsp;&#40;{user.jobRole}
                  &#41;
                </option>
              ))}
            </select>
            <button
              className="save-assigned-user-button"
              type="button"
              onClick={handleAssignedUserSubmit}
            >
              Save
            </button>
          </div>
          {assignedBy === user.userName && (
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
