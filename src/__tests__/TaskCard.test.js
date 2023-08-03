import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

describe("renders", () => {
  const validProps = {
    title: "test",
    priorityLevel: "test",
    details: "test",
    dueDate: "03 August 2023",
    status: "test",
    id: 1,
    user: "test",
    assignedBy: "test",
    assignTo: 1,
    usersList: [{ firstName: "test", lastName: "test", id: 1 }],
  };

  it("renders correctly", () => {
    const { asFragment } = render(
      <TaskCard
        title={validProps.title}
        priorityLevel={validProps.priorityLevel}
        details={validProps.details}
        dueDate={validProps.dueDate}
        status={validProps.status}
        id={validProps.id}
        user={validProps.user}
        assignedBy={validProps.assignedBy}
        assignTo={validProps.assignTo}
        usersList={validProps.usersList}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("conditionally renders a delete button if userName === assignedBy", () => {
    const testuser = {
      userName: "test",
    };
    render(
      <TaskCard
        title={validProps.title}
        priorityLevel={validProps.priorityLevel}
        details={validProps.details}
        dueDate={validProps.dueDate}
        status={validProps.status}
        id={validProps.id}
        user={testuser}
        assignedBy={validProps.assignedBy}
        assignTo={validProps.assignTo}
        usersList={validProps.usersList}
      />
    );

    const deleteButton = screen.getByText(/delete/i);

    expect(deleteButton).toBeInTheDocument();
  });
});

describe("get comments", () => {
  const validProps = {
    title: "test",
    priorityLevel: "test",
    details: "test",
    dueDate: "03 August 2023",
    status: "test",
    id: 1,
    user: "test",
    assignedBy: "test",
    assignTo: 1,
    usersList: [{ firstName: "test", lastName: "test", id: 1 }],
  };

  it("Should make a call to the correct URL", async () => {
    const mockData = {
      data: [{ comment: "test comment" }, { comment: "test comment 2" }],
    };
    jest.spyOn(axios, "get").mockResolvedValue(mockData);

    render(
      <TaskCard
        title={validProps.title}
        priorityLevel={validProps.priorityLevel}
        details={validProps.details}
        dueDate={validProps.dueDate}
        status={validProps.status}
        id={validProps.id}
        user={validProps.user}
        assignedBy={validProps.assignedBy}
        assignTo={validProps.assignTo}
        usersList={validProps.usersList}
      />
    );

    expect(await screen.findByText("test comment")).toBeInTheDocument();
    expect(await axios.get).toHaveBeenCalledWith(`/comments/${validProps.id}`);
  });
});

// describe("save comment button", () => {
//   const validProps = {
//     title: "test",
//     priorityLevel: "test",
//     details: "test",
//     dueDate: "03 August 2023",
//     status: "test",
//     id: 1,
//     user: "test",
//     assignedBy: "test",
//     assignTo: 1,
//     usersList: [{ firstName: "test", lastName: "test", id: 1 }],
//   };
//   it("should make an axios.post call to correct URL", () => {
//     jest.mock("axios");
//     axios.post.mockImplementationOnce();

//     render(
//       <TaskCard
//         title={validProps.title}
//         priorityLevel={validProps.priorityLevel}
//         details={validProps.details}
//         dueDate={validProps.dueDate}
//         status={validProps.status}
//         id={validProps.id}
//         user={validProps.user}
//         assignedBy={validProps.assignedBy}
//         assignTo={validProps.assignTo}
//         usersList={validProps.usersList}
//       />
//     );
//   });
// });
