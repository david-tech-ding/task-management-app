import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import "../styles/taskcardpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";

const TaskCardPage = ({ user, users, isAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const search = useLocation();
  const navigate = useNavigate();
  const [tasksToShow, setTasksToShow] = useState([]);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const yourTasks = tasks.filter((task) => task.assignTo === user.id);

  const tasksAssignedByYou = tasks.filter(
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

  const filterTasksByStatus = (status) => {
    return allYourTasks.filter((task) => task.status === status);
  };

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    axios
      .get(`/task`)
      .then((data) => {
        setTasks(data.data);
        if (search.pathname === "/your-tasks") {
          setTasksToShow(yourTasks);
        } else if (search.pathname === "/assigned-by-you") {
          setTasksToShow(tasksAssignedByYou);
        } else if (search.pathname === "/due-soon") {
          setTasksToShow(tasksDueSoon);
        } else if (search.pathname === "/all-tasks") {
          isAdmin ? setTasksToShow(data.data) : navigate("/");
        } else if (search.pathname === "/your-tasks/completed") {
          setTasksToShow(filterTasksByStatus("Completed"));
        } else if (search.pathname === "/your-tasks/in-progress") {
          setTasksToShow(filterTasksByStatus("In Progress"));
        } else if (search.pathname === "/your-tasks/not-started") {
          setTasksToShow(filterTasksByStatus("Not Started"));
        }
        if (selectedUser) {
          const tasksForSelectedUser = allYourTasks.filter(
            (task) => task.assignTo === selectedUser[1] // Use selectedUser[1] as user id
          );
          setTasksToShow(tasksForSelectedUser);
        } else {
          setTasksToShow(allYourTasks);
        }
      })
      .catch((err) => console.log(err));
  });

  const sortTasksByDate = (tasks) => {
    return tasks.sort((a, b) => {
      let dateA = new Date(a.dueDate);
      let dateB = new Date(b.dueDate);

      return dateA - dateB;
    });
  };

  const priorityOrder = ["High", "Medium", "Low"];

  const sortTaskCardByPriority = (tasks) => {
    console.log("Sorting by priority...");
    return tasks.slice().sort((a, b) => {
      const priorityComparison =
        priorityOrder.indexOf(a.priorityLevel) -
        priorityOrder.indexOf(b.priorityLevel);
      if (priorityComparison !== 0) {
        return priorityComparison;
      }

      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  const sortedTaskCards = sortByPriority
    ? sortTaskCardByPriority(tasksToShow)
    : sortByDate
    ? sortTasksByDate(tasksToShow)
    : // : userFilter && search.pathname === "/your-tasks"
      // ? filterByAssignedBy(tasksToShow)
      // : userFilter && search.pathname === "/assigned-by-you"
      // ? filterByAssignTo(tasksToShow)
      // : userFilter && search.pathname === "/due-soon"
      // ? filterByBothAssignValues(tasksToShow)
      tasksToShow;

  useEffect(() => {
    if (!user.id) {
      navigate("/");
    }
  });

  return (
    <div className="task-card-page">
      <SideBar
        className="sidebar"
        setSortByPriority={setSortByPriority}
        sortByPriority={sortByPriority}
        setSortByDate={setSortByDate}
        sortByDate={sortByDate}
        filterTasksByStatus={filterTasksByStatus}
        changeUser={handleSelectedUser}
      />
      <div className="task-card-content">
        {sortedTaskCards.map((task) => {
          return (
            <TaskCard
              task-card_in-grid
              key={task.id}
              title={task.title}
              priorityLevel={task.priorityLevel}
              details={task.details}
              dueDate={task.dueDate}
              status={task.status}
              id={task.id}
              user={user}
              assignedBy={task.assignedBy}
              assignTo={task.assignTo}
              usersList={users}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskCardPage;
