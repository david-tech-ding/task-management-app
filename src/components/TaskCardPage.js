import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import "../styles/taskcardpage.css";

const TaskCardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/task")
      .then((data) => {
        console.log(data.data);
        setTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="task-card-page">
      <div className="task-card-grid">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              title={task.title}
              priorityLevel={task.priorityLevel}
              details={task.details}
              dueDate={task.dueDate}
              status={task.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskCardPage;
