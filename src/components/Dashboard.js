import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskSummary from "./TaskSummary";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = ({ user }) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [dashboardTasks, setDashboardTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/task")
      .then((data) => {
        setDashboardTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const yourTasks = dashboardTasks.filter((task) => task.assignTo === user);

  const tasksAssignedByYou = dashboardTasks.filter(
    (task) => task.assignedBy === user
  );

  const combinedTasks = yourTasks.concat(tasksAssignedByYou);
  const allYourTasks = [...new Set(combinedTasks)];
  console.log(allYourTasks);

  const tasksDueSoon = allYourTasks.filter((yourTask) => {
    const soonDue = new Date();
    soonDue.setDate(new Date().getDate() + 3);
    const taskDueDate = new Date(yourTask.dueDate);
    return taskDueDate <= soonDue;
  });

  return (
    <div className="dashboard-page">
      <h1>{user}'s Dashboard</h1>
      <TaskSummary
        title={
          <Link className="task-summary-link" to="/tasks">
            Your Tasks
          </Link>
        }
        tasks={yourTasks}
      />
      <TaskSummary title="Tasks Assigned By You" tasks={tasksAssignedByYou} />
      <TaskSummary title="Due Soon" tasks={tasksDueSoon} />
    </div>
  );
};

export default Dashboard;
