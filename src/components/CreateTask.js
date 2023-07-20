import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createtask.css";

const CreateTask = () => {
  axios.defaults.baseURL = "https://api.trello.com/1";

  const [date, setDate] = useState();

  const initialState = {
    fields: {
      title: "",
      details: "",
      priorityLevel: "High",
      assignTo: "",
      dueDate: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log(fields);
    axios
      .post("/cards", { ...fields })
      .then(() => {
        console.log(fields);
      })
      .catch((err) => console.log(err));
  };
  const handleDateChange = (chosenDate) => {
    setDate(chosenDate);
    setFields({ ...fields, dueDate: chosenDate });
  };
  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
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
          <input
            className="create-task-form_input"
            type="text"
            id="assignTo"
            name="assignTo"
            value={fields.assignTo}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="dueDate">
          Due Date
          <DatePicker
            className="create-task-form_input"
            selected={date}
            onChange={handleDateChange}
            id="dueDate"
            name="dueDate"
            value={fields.dueDate}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;
