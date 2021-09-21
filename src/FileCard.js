import React from "react";
import { Card } from "@workday/canvas-kit-react/card";
import "./Files.css";

export const FileCard = ({ filename, handleDelete }) => {
  return (
    <Card className="filecard-container">
      <Card.Body>
        <img className="filename" src={`http://localhost:8000/${filename}`} />
      </Card.Body>
      <button onClick={() => handleDelete(filename)}>Remove</button>
    </Card>
  );
};
