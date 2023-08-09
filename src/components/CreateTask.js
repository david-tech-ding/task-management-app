import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createtask.css";
import { useNavigate } from "react-router-dom";

const CreateTask = ({ user, users }) => {
  const [date, setDate] = useState();
  const currentDate = new Date();
  const navigate = useNavigate();

  const initialState = {
    fields: {
      title: "",
      details: "",
      priorityLevel: "High",
      assignTo: "default",
      assignedBy: "",
      dueDate: "",
      status: "Not Started",
    },
  };

  const [fields, setFields] = useState(initialState.fields);

  const handleCreateTask = (e) => {
    e.preventDefault();
    axios
      .post("/task", { ...fields })
      .then(() => {
        console.log(fields);
        setFields(initialState.fields);
      })
      .catch((err) => console.log(err));
  };
  const handleDateChange = (chosenDate) => {
    setDate(chosenDate);
    setFields({ ...fields, dueDate: chosenDate });
  };
  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
      assignedBy: `${user.userName}`,
    });
  };

  useEffect(() => {
    if (!user.id) {
      navigate("/");
    }
  });

  return (
    <div className="create-task">
      <h2 className="create-task-heading">Create A New Task</h2>
      <form className="create-task-form" onSubmit={handleCreateTask}>
        <label htmlFor="title">Title:</label>
        <input
          className="create-task-form_input"
          type="text"
          id="title"
          name="title"
          value={fields.title}
          maxLength={50}
          onChange={handleFieldChange}
        />
        <label htmlFor="details">Details:</label>
        <input
          className="create-task-form_input"
          type="text"
          id="details"
          name="details"
          value={fields.details}
          maxLength={255}
          onChange={handleFieldChange}
        />
        <label htmlFor="dueDate">Due Date:</label>
        <DatePicker
          className="create-task-form_input"
          selected={date}
          onChange={handleDateChange}
          minDate={currentDate}
          id="dueDate"
          name="dueDate"
          value={fields.dueDate}
          autoComplete="off"
        />
        <label htmlFor="priorityLevel">Priority Level:</label>
        <select
          className="create-task-form_select"
          id="priorityLevel"
          name="priorityLevel"
          value={fields.priorityLevel}
          onChange={handleFieldChange}
          data-testid="priorityLevel"
        >
          <option className="priority-level-high" value="High">
            High
          </option>
          <option className="priority-level-high" value="Medium">
            Medium
          </option>
          <option className="priority-level-high" value="Low">
            Low
          </option>
        </select>
        <label htmlFor="assignTo">Assign To:</label>
        <select
          className="create-task-form_select"
          id="assignTo"
          name="assignTo"
          defaultValue="default"
          value={fields.assignTo}
          onChange={handleFieldChange}
          data-testid="assignTo"
        >
          <>
            <option value="default" disabled>
              Choose an assignee
            </option>
            {users.map((userData) => {
              return (
                <option value={userData.id} key={userData.id}>
                  {userData.firstName}&nbsp;{userData.lastName}&nbsp;&#40;
                  {userData.jobRole}&#41;
                </option>
              );
            })}
          </>
        </select>
        <button
          className="create-task-form_button"
          type="submit"
          onClick={handleCreateTask}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
