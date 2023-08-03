import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter as Router } from "react-router-dom";
import CreateTask from "../components/CreateTask";

jest
  .spyOn(axios, "post")
  .mockImplementation(() => Promise.resolve({ data: {} }));

describe("CreateTask component", () => {
  it("renders correctly", () => {
    const users = [
      { id: 1, firstName: "David", lastName: "Ding", jobRole: "Developer" },
      {
        id: 2,
        firstName: "James",
        lastName: "Lee",
        jobRole: "Product Manager",
      },
      {
        id: 3,
        firstName: "Jasper",
        lastName: "Lim",
        jobRole: "Human Resources",
      },
    ];

    const user = {
      id: 3,
      firstName: "Jasper",
      lastName: "Lim",
      jobRole: "Human Resources",
    };

    const { asFragment } = render(
      <Router>
        <CreateTask user={user} users={users} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  //   it("creates a new Task when the form is submitted", async () => {
  //     const users = [
  //       { id: 1, firstName: "David", lastName: "Ding", jobRole: "Developer" },
  //       {
  //         id: 2,
  //         firstName: "James",
  //         lastName: "Lee",
  //         jobRole: "Product Manager",
  //       },
  //       {
  //         id: 3,
  //         firstName: "Jasper",
  //         lastName: "Lim",
  //         jobRole: "Human Resources",
  //       },
  //     ];

  //     const user = {
  //       id: 3,
  //       firstName: "Jasper",
  //       lastName: "Lim",
  //       jobRole: "Human Resources",
  //     };

  //     render(
  //       <Router>
  //         <CreateTask user={user} users={users} />
  //       </Router>
  //     );

  //     const titleInput = screen.getByLabelText("Title");
  //     const detailsInput = screen.getByLabelText("Details");
  //     const priorityDropdown = screen.getByTestId("priorityLevel");
  //     const assignToDropdown = screen.getByTestId("assignTo");
  //     const dueDateInput = screen.getByLabelText("Due Date");
  //     const createButton = screen.getByText("Create");

  //     fireEvent.change(titleInput, { target: { value: "Test Title" } });
  //     fireEvent.change(detailsInput, { target: { value: "Test Details" } });
  //     fireEvent.change(priorityDropdown, { target: { value: "High" } });
  //     fireEvent.change(assignToDropdown, { target: { value: "1" } });
  //     fireEvent.click(dueDateInput);
  //     fireEvent.click(screen.getByText("8"));

  //     fireEvent.click(createButton);

  //     await waitFor(() => {
  //       expect(axios.post).toHaveBeenCalledWith("/task", {
  //         title: "Test Title",
  //         details: "Test Details",
  //         priorityLevel: "High",
  //         assignTo: "1",
  //         dueDate: "08/08/2023",
  //       });
  //     });

  //     expect(titleInput.value).toBe("Test Title");
  //     expect(detailsInput.value).toBe("Test Details");
  //     expect(priorityDropdown.value).toBe("High");
  //     expect(assignToDropdown.value).toBe("1");
  //     expect(dueDateInput.value).toBe("08/08/2023");
  //   });
});
