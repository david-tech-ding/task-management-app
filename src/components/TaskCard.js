import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as TiIcons from "react-icons/ti";
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
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

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

  const handleSaveComment = (e) => {
    e.preventDefault();
    removeEnterKeyPressListener();

    if (newComment.trim() !== "") {
      axios
        .post("/comments", { comment: newComment, TaskId: id })
        .then((res) => {
          setSavedComments([...savedComments, res.data]);
          setNewComment("");
        })
        .catch((err) => console.log(err));
      addEnterKeyPressListener();
    }
  };

  const handleClearComment = (id) => {
    axios
      .delete(`/comments/${id}`)
      .then(() => {
        setSavedComments(savedComments.filter((comment) => comment.id !== id));
        setSelectedCommentId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleTitleClick = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <div className="task-card-page">
      <div className="task-card-grid">
        <div className={`task-card ${priorityLevel}`}>
          <div className="task-card_title-container" onClick={handleTitleClick}>
            <span className="task-card_title">{title}</span>
          </div>
          {detailsVisible && (
            <form className="task-card_form">
              <div className="details-container">
                <h3>
                  Task Details
                  <div className="task-card_details">{details}</div>
                </h3>
              </div>
              <div className="comments-container">
                <h3>Comments</h3>
                <ul className="comments-list">
                  {savedComments.map((data) => (
                    <li
                      key={data.id}
                      className={
                        selectedCommentId === data.id ? "selected" : ""
                      }
                    >
                      {data.comment}
                      {selectedCommentId === data.id ? (
                        <button
                          type="button"
                          className="tick-button"
                          onClick={() => handleClearComment(data.id)}
                        >
                          <span className="tick-container">
                            <TiIcons.TiTick className="tick-logo" />
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedCommentId(data.id)}
                        >
                          Clear
                        </button>
                      )}
                    </li>
                  ))}
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
          )}
          <div className="task-card_priority_level">
            {priorityLevel}&nbsp;Priority
          </div>
          <div className="task-card_status">
            <b>Status:</b> {status}
          </div>
          <select
            className="task-card_select-input"
            id="status-select"
            onChange={handleStatusChange}
            defaultValue={status}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            className="task-card_button"
            type="button"
            onClick={handleStatusSubmit}
          >
            Change Status
          </button>
          <div className="assign-container">
            <h3>Assign To</h3>
            <div className="assign-row">
              <select
                className="task-card_select-input"
                id="assigned-user_select"
                onChange={handleAssignedUserChange}
                value={assignedUser}
              >
                {usersList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName}&nbsp;{user.lastName}&nbsp;&#40;
                    {user.jobRole}
                    &#41;
                  </option>
                ))}
              </select>
              <button
                className="task-card_button"
                type="button"
                onClick={handleAssignedUserSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className="task-card_due_date">Due on: {dueDate}</div>
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
