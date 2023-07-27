import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import SideBar from "./SideBar";
import "../styles/taskcardpage.css";
import { useLocation } from "react-router-dom";

const TaskCardPage = ({ user }) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const [tasks, setTasks] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const search = useLocation();
  const [tasksToShow, setTasksToShow] = useState([]);

  const yourTasks = tasks.filter((task) => task.assignTo === user);

  const tasksAssignedByYou = tasks.filter((task) => task.assignedBy === user);

  const combinedTasks = yourTasks.concat(tasksAssignedByYou);
  const allYourTasks = [...new Set(combinedTasks)];

  const tasksDueSoon = allYourTasks.filter((yourTask) => {
    const soonDue = new Date();
    soonDue.setDate(new Date().getDate() + 3);
    const taskDueDate = new Date(yourTask.dueDate);
    return taskDueDate <= soonDue;
  });

  useEffect(() => {
    axios
      .get(`/task/${userFilter}`)
      .then((data) => {
        setTasks(data.data);
        if (search.pathname === "/your-tasks") {
          setTasksToShow(yourTasks);
        } else if (search.pathname === "/assigned-by-you") {
          setTasksToShow(tasksAssignedByYou);
        } else if (search.pathname === "/due-soon") {
          setTasksToShow(tasksDueSoon);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="task-card-page">
      <SideBar className="sidebar" changeUser={setUserFilter} />
      <div className="task-card-grid">
        {tasksToShow.map((task) => {
          return (
            <TaskCard
              key={task.id}
              title={task.title}
              priorityLevel={task.priorityLevel}
              details={task.details}
              dueDate={task.dueDate}
              status={task.status}
              id={task.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskCardPage;
