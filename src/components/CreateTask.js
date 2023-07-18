import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createtask.css";

const CreateTask = () => {
  axios.defaults.baseURL = "https://api.trello.com/1";

  const initialState = {
    fields: {
      title: "",
      details: "",
      priorityLevel: "",
      assignTo: "",
      dueDate: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [startDate, setStartDate] = useState(new Date());
  const onDateChange = (date) => setStartDate(date);
  const handleCreateTask = (e) => {
    e.preventDefault();
    axios
      .post("/cards", { ...fields })
      .then(console.log(fields))
      .catch((err) => console.log(err));
  };
  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-task">
      <h2 className="create-task-heading">Create A New Task</h2>
      <form className="create-task-form" onSubmit={handleCreateTask}>
        <label htmlFor="title">Title</label>
        <input
          className="create-task-form_input"
          type="text"
          id="title"
          name="title"
          value={fields.title}
          onChange={handleFieldChange}
        />
        <label htmlFor="details">Details</label>
        <input
          className="create-task-form_input"
          type="text"
          id="details"
          name="details"
          value={fields.details}
          onChange={handleFieldChange}
        />
        <label htmlFor="priorityLevel">Priority Level</label>
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
        <label htmlFor="assignTo">Assign To</label>
        <input
          className="create-task-form_input"
          type="text"
          id="assignTo"
          name="assignTo"
          value={fields.assignTo}
          onChange={handleFieldChange}
        />
        <DatePicker
          selected={startDate}
          onDateChange={onDateChange}
          id="dueDate"
          name="dueDate"
          value={fields.dueDate}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;
