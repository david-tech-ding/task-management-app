import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import SideBar from "./SideBar";
import "../styles/taskcardpage.css";

const TaskCardPage = () => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [tasks, setTasks] = useState([]);
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    axios
      .get(`/task/${userFilter}`)
      .then((data) => {
        setTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, [userFilter]);

  return (
    <div className="task-card-page">
      <SideBar className="sidebar" changeUser={setUserFilter} />
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
