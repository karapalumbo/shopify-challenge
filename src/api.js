import axios from "axios";

class FilesApi {
  static async allFiles() {
    let getFiles = await axios.get("http://localhost:8000/images");
    return getFiles.data.imageFiles;
  }

  static async addFiles(data) {
    let addFiles = await axios.post("http://localhost:8000/image", data);
    return addFiles;
  }
}

export default FilesApi;
