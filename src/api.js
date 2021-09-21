import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

class FilesApi {
  static async allFiles() {
    let getFiles = await axios.get(`${BASE_URL}/images`);
    return getFiles.data;
  }

  static async addFiles(data) {
    let addFiles = await axios.post(`${BASE_URL}/image`, data);
    return addFiles;
  }

  static async deleteFile(filename) {
    await axios.delete(`${BASE_URL}/delete/${filename}`);
  }
}

export default FilesApi;
