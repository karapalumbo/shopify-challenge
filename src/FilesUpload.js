import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { FileCard } from "./FileCard";
import { PrimaryButton } from "@workday/canvas-kit-react/button";
import { TextInput } from "@workday/canvas-kit-react/text-input";
import { Flex } from "@workday/canvas-kit-labs-react/layout";
import FilesApi from "./api";
import "./Files.css";

export const FilesUpload = () => {
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState([]);

  axios.defaults.headers.common = {
    "Content-Type": "application/json",
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.files[0]);
  };

  const handleRequest = async () => {
    let allFiles = await FilesApi.allFiles();

    let f = allFiles.map((image) => {
      let str = image.split("/");
      let img = str.pop();
      return img;
    });

    setFiles(f);
  };

  useEffect(() => {
    handleRequest();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageFile = inputValue;
    formData.append("image", imageFile);

    await FilesApi.addFiles(formData).then((response) => {
      setFiles([response.data.file.filename, ...files]);
    });
  };

  const handleDelete = async (fileId) => {
    await FilesApi.deleteFile(fileId);
  };

  if (!files) return <Loading />;

  return (
    <>
      <div className="container">
        <form className="upload-form">
          <div className="form-container">
            <h2>Your inventory</h2>
            <div className="upload-actions">
              <div className="form-group">
                <TextInput type="file" onChange={handleChange}></TextInput>
              </div>
              <div className="form-group">
                <PrimaryButton
                  style={{ marginLeft: "15px" }}
                  type="submit"
                  onClick={handleUpload}
                >
                  Upload
                </PrimaryButton>
              </div>
            </div>
          </div>
        </form>
        {files.length ? (
          <div className="container">
            {files.map((file) => {
              return (
                <FileCard
                  key={file}
                  filename={file}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        ) : (
          <p>Upload an image!</p>
        )}
      </div>
    </>
  );
};
