// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import axios from "axios";
// import { MemoryRouter } from "react-router-dom";
// import App from "./App";

// jest.mock("axios");
// axios.get.mockResolvedValue({ data: [] });

// describe("App component", () => {
//   test("renders the navbar with correct props", () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByRole("navigation")).toBeInTheDocument();
//     expect(screen.getByRole("navigation")).toHaveClass("navbar");
//   });
// });

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../components/App";

describe("App component", () => {
  it("renders correectly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
