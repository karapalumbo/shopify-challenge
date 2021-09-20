import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

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

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageFile = inputValue;
    formData.append("image", imageFile);

    await axios
      .post("http://localhost:8000/image", formData)
      .then((response) => {
        console.log(response);
        setFiles([response.data.file, ...files]);
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
          <div>
            {files.map((file) => {
              return <img src={`http://localhost:8000/${file.filename}`} />;
            })}
          </div>
        ) : (
          <p>Upload a photo!</p>
        )}
      </div>
    </>
  );
};
