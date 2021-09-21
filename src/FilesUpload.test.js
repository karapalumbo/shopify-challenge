import React from "react";
import { render } from "@testing-library/react";
import { FilesUpload } from "./FilesUpload";

it("renders without crashing", function () {
  render(<FilesUpload />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<FilesUpload />);
  expect(asFragment()).toMatchSnapshot();
});
