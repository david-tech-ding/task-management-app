import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskSummary from "./TaskSummary";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/task")
      .then((data) => {
        setTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <TaskSummary
        title={
          <Link className="task-summary-link" to="/your-tasks">
            Your Tasks
          </Link>
        }
        tasks={tasks}
      />
      <TaskSummary title="Tasks Assigned By You" tasks={tasks} />
      <TaskSummary title="Due Soon" tasks={tasks} />
    </div>
  );
};

export default Dashboard;
