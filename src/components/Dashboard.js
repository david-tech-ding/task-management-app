import React from "react";
import TaskSummary from "./TaskSummary";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskSummary title="Your Tasks" tasks={[{ priorityLevel: "High" }]} />
      <TaskSummary title="Tasks Assigned By You" tasks={[]} />
      <TaskSummary title="Due Soon" tasks={[]} />
    </div>
  );
};

export default Dashboard;
