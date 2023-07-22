import React from "react";
import TaskSummary from "./TaskSummary";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskSummary
        title={
          <Link className="task-summary-link" to="/your-tasks">
            Your Tasks
          </Link>
        }
        tasks={[{ priorityLevel: "High" }]}
      />
      <TaskSummary title="Tasks Assigned By You" tasks={[]} />
      <TaskSummary title="Due Soon" tasks={[]} />
    </div>
  );
};

export default Dashboard;
