import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import { FileCard } from "./FileCard";
import { PrimaryButton } from "@workday/canvas-kit-react/button";
import { TextInput } from "@workday/canvas-kit-react/text-input";
import FilesApi from "./api";
import "./Files.css";

export const FilesUpload = () => {
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState([]);
  const [filesInfo, setFilesInfo] = useState([]);

  axios.defaults.headers.common = {
    "Content-Type": "application/json",
  };

  const ref = useRef();

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.files[0]);
  };

  const handleRequest = async () => {
    let allFiles = await FilesApi.allFiles();

    let f = allFiles.imageFiles.map((image) => {
      let str = image.split("/");
      let img = str.pop();
      return img;
    });
    setFilesInfo(allFiles.imagesData);

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
      setFilesInfo([response.data.file, ...filesInfo]);
      setFiles([response.data.file.filename, ...files]);
    });

    ref.current.value = "";
  };

  const handleDelete = async (filename) => {
    await FilesApi.deleteFile(filename).then((resp) => {
      FilesApi.allFiles().then((response) => {
        let f = response.imageFiles.map((image) => {
          let str = image.split("/");
          let img = str.pop();
          return img;
        });
        setFiles(f);
        setFilesInfo(response.imagesData);
      });
    });
  };

  if (!files && !filesInfo) return <Loading />;

  return (
    <>
      <div className="container">
        <form className="upload-form">
          <div className="form-container">
            <h2>Your inventory</h2>
            <div className="upload-actions">
              <div className="form-group">
                <TextInput
                  ref={ref}
                  type="file"
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="form-group">
                <PrimaryButton
                  grow
                  style={{ marginTop: "15px" }}
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
          <div className="container card-container">
            {filesInfo &&
              files.map((file) => {
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
          <div className="empty-state">
            <p>You currently have no images uploaded</p>
          </div>
        )}
      </div>
    </>
  );
};
