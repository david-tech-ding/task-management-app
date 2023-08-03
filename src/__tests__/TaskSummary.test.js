import React from "react";
import { render, screen } from "@testing-library/react";
import TaskSummary from "../components/TaskSummary";

describe("renders TaskSummary correctly", () => {
  it("renders correctly", () => {
    const validProps = {
      title: "test title",
      tasks: [],
    };
    const { asFragment } = render(
      <TaskSummary title={validProps.title} tasks={validProps.tasks} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("contains correct elements", () => {
  it("contains 3 priority level summaries", () => {
    const validProps = {
      title: "test title",
      tasks: [],
    };

    render(<TaskSummary title={validProps.title} tasks={validProps.tasks} />);
    const priorityLevelSummaries = screen.queryAllByRole("heading", {
      level: 3,
    });

    expect(priorityLevelSummaries).toHaveLength(3);
  });

  it("has a counter for each priority level which changes based on tasks", () => {
    const validProps = {
      title: "test title",
      tasks: [{ priorityLevel: "High" }],
    };

    render(<TaskSummary title={validProps.title} tasks={validProps.tasks} />);
    const highPriorityCounter = screen.getByText(/1/);
    expect(highPriorityCounter).toBeInTheDocument();
  });
});
