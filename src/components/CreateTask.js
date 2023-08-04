import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createtask.css";

const CreateTask = ({ user, users }) => {
  const [date, setDate] = useState();

  const initialState = {
    fields: {
      title: "",
      details: "",
      priorityLevel: "High",
      assignTo: "",
      assignedBy: "",
      dueDate: "",
      status: "Not started",
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
    });
  };

  return (
    <div className="create-task">
      <h2 className="create-task-heading">Create A New Task</h2>
      <form className="create-task-form" onSubmit={handleCreateTask}>
        <label htmlFor="title">
          Title
          <input
            className="create-task-form_input"
            type="text"
            id="title"
            name="title"
            value={fields.title}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="details">
          Details
          <input
            className="create-task-form_input"
            type="text"
            id="details"
            name="details"
            value={fields.details}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="priorityLevel">
          Priority Level
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
        </label>
        <label htmlFor="assignTo">
          Assign To
          <select
            className="create-task-form_input"
            id="assignTo"
            name="assignTo"
            value={fields.assignTo}
            onChange={handleFieldChange}
            data-testid="assignTo"
          >
            {users.map((userData) => {
              return (
                <option value={userData.id} key={userData.userName}>
                  {userData.firstName}&nbsp;{userData.lastName}&nbsp;&#40;
                  {userData.jobRole}&#41;
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="dueDate">Due Date </label>
        <DatePicker
          className="create-task-form_input"
          selected={date}
          onChange={handleDateChange}
          id="dueDate"
          name="dueDate"
          value={fields.dueDate}
          autoComplete="off"
        />
        <button type="submit" onClick={handleCreateTask}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
