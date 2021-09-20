import React from "react";
import { Card } from "@workday/canvas-kit-react/card";
import "./Files.css";

export const FileCard = ({ filename }) => {
  return (
    <Card className="filecard-container">
      {/* <Card.Heading>Photo</Card.Heading> */}
      <Card.Body>
        <img className="filename" src={`http://localhost:8000/${filename}`} />
      </Card.Body>
    </Card>
  );
};
