import React, { useState } from "react";
import axios from "axios";

export const FilesUpload = () => {
  const [inputValue, setInputValue] = useState("");

  axios.defaults.headers.common = {
    "Content-Type": "application/json",
  };

  const handleChange = (event) => {
    event.preventDefault();
    // const s = event.target.value;
    // const photo = s.split("\\")[2];
    console.log(event.target.files[0]);
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
      });
  };

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
      </div>
    </>
  );
};
