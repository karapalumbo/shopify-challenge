import React from "react";

export const FilesUpload = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <form>
            <h3>File Upload</h3>
            <div className="form-group">
              <input type="file"></input>
            </div>
            <div className="form-group">
              <button type="submit">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
