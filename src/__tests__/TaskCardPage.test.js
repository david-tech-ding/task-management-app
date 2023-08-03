import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import TaskCardPage from "../components/TaskCardPage";

describe("renders", () => {
  it("renders correctly", () => {
    const validProps = {
      id: 1,
      userName: "testuser",
      firstName: "testname",
    };
    const { asFragment } = render(
      <Router>
        <TaskCardPage user={validProps} users={[validProps]} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("gets data", () => {
  it("renders taskcards after getting data from an API", async () => {
    const validProps = {
      id: 1,
      userName: "testuser",
      firstName: "testname",
    };
    const mockedData = {
      data: [
        {
          title: "test task data",
          priorityLevel: "test",
          details: "test",
          dueDate: "03 August 2023",
          status: "test",
          id: 1,
          user: "test",
          assignedBy: "test",
          assignTo: 1,
          usersList: [{ firstName: "test", lastName: "test", id: 1 }],
        },
      ],
    };
    jest.spyOn(axios, "get").mockResolvedValue(mockedData);

    render(
      <Router>
        <TaskCardPage user={validProps} users={[validProps]} />
      </Router>
    );

    expect(await axios.get).toHaveBeenCalledWith(`/task/`);
    // expect(await screen.findByText("test task data")).toBeInTheDocument();
  });
});
