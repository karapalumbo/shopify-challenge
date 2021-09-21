import axios from "axios";

const url = "http://localhost:8000";

class FilesApi {
  static async allFiles() {
    let getFiles = await axios.get(`${url}/images`);
    return getFiles.data;
  }

  static async addFiles(data) {
    let addFiles = await axios.post(`${url}/image`, data);
    return addFiles;
  }

  static async deleteFile(filename) {
    await axios.delete(`${url}/delete/${filename}`);
  }
}

export default FilesApi;
