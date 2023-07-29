import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskSummary from "./TaskSummary";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = ({ user }) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [dashboardTasks, setDashboardTasks] = useState([]);

  console.log(user);

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
          <Link className="task-summary-link" to="/your-tasks">
            Your Tasks
          </Link>
        }
        tasks={yourTasks}
      />
      <TaskSummary
        title={
          <Link className="task-summary-link" to="/assigned-by-you">
            Assigned By You
          </Link>
        }
        tasks={tasksAssignedByYou}
      />
      <TaskSummary
        title={
          <Link className="task-summary-link" to="/due-soon">
            Due Soon
          </Link>
        }
        tasks={tasksDueSoon}
      />
    </div>
  );
};

export default Dashboard;
