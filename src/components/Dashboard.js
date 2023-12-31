import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskSummary from "./TaskSummary";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = ({ user, isAdmin }) => {
  const [dashboardTasks, setDashboardTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/task")
      .then((data) => {
        setDashboardTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const yourTasks = dashboardTasks.filter((task) => task.assignTo === user.id);

  const tasksAssignedByYou = dashboardTasks.filter(
    (task) => task.assignedBy === user.userName
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
      <h1>{user.firstName}'s Dashboard</h1>
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
      {isAdmin ? (
        <TaskSummary
          title={
            <Link className="task-summary-link" to="/all-tasks">
              All Tasks
            </Link>
          }
          tasks={dashboardTasks}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
