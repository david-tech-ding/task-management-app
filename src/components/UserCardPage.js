import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import "../styles/usercardpage.css";

const UserCardPage = (isAdmin) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    isAdmin
      ? axios
          .get("/user")
          .then((data) => setUsers(data.data))
          .catch((err) => console.log(err))
      : navigate("/");
  });

  return (
    <div className="user-card-page">
      <div className="user-card-content">
        {users.map((user) => {
          return (
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              jobRole={user.jobRole}
              id={user.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserCardPage;
