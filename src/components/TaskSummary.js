import React from "react";
import "../styles/tasksummary.css";

const TaskSummary = ({ title, tasks }) => {
  const highPriorityTasks = tasks.filter(
    (task) => task.priorityLevel === "High"
  );
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priorityLevel === "Medium"
  );
  const lowPriorityTasks = tasks.filter((task) => task.priorityLevel === "Low");
  return (
    <div className="dashboard">
      <div className="task-summary">
        <h2 className="task-summary-heading">{title}</h2>
        <div className="high-priority-summary">
          <h3 className="priority-summary-heading">High Priority</h3>
          {highPriorityTasks.length}
        </div>
        <div className="medium-priority-summary">
          <h3 className="priority-summary-heading">Medium Priority</h3>
          {mediumPriorityTasks.length}
        </div>
        <div className="low-priority-summary">
          <h3 className="priority-summary-heading">Low Priority</h3>
          {lowPriorityTasks.length}
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
