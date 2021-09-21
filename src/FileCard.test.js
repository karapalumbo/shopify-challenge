import React from "react";
import { render } from "@testing-library/react";
import { FileCard } from "./FileCard";

it("renders without crashing", function () {
  render(<FileCard />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<FileCard key="123" filename="123.jpg" />);
  expect(asFragment()).toMatchSnapshot();
});
