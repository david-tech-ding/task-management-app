import React from "react";
import { render, screen } from "@testing-library/react";
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

// describe("gets data", () => {
//   it("renders taskcards after getting data from an API", async () => {
//     const validProps = {
//       id: 1,
//       userName: "testuser",
//       firstName: "testname",
//     };
//     const mockedData = {
//       data: [
//         {
//           title: "test task data",
//         },
//       ],
//     };
//     jest.spyOn(axios, "get").mockResolvedValue(mockedData);

//     render(
//       <Router>
//         <TaskCardPage user={validProps} users={[validProps]} />
//       </Router>
//     );

//     expect(await screen.findByText("test task data")).toBeInTheDocument();
//   });
// });
