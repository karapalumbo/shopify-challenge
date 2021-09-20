import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { FileCard } from "./FileCard";
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

    await FilesApi.addFiles(formData)
      // await axios
      //   .post("http://localhost:8000/image", formData)
      .then((response) => {
        setFiles([response.data.file.filename, ...files]);
      });
  };

  if (!files) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="row">
          <form>
            <h3>File Upload</h3>
            <div className="form-group">
              <input type="file" onChange={handleChange}></input>
            </div>
            <div className="form-group">
              <button type="submit" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </form>
        </div>
        {files.length ? (
          <div className="container">
            {files.map((file) => {
              return <FileCard filename={file} />;
            })}
          </div>
        ) : (
          <p>Upload a photo!</p>
        )}
      </div>
    </>
  );
};
