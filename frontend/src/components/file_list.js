import React, { useEffect, useState } from "react";
import { get_file_list, download_file_from_url, delete_file } from "../api";

function FileList() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  const fetchFiles = async () => {
    try {
      const res = await get_file_list();
      setFiles(res.file_list || []);
    } catch (err) {
      console.log("There is an error in fetchFiles: ", err);
      setStatus("Failed to fetch files.");
    }
  };

  const handleDelete = async (message_id) => {
    try {
      await delete_file(message_id);
      await fetchFiles(); // ✅ Refresh list after successful delete
    } catch (err) {
      console.log("Failed to delete file: ", err);
      setStatus("Failed to delete file.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container my-4">
      <h3>Available Files</h3>
      {status && <p>{status}</p>}

      <div className="row">
        {files.map((file, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="file-card card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <p className="card-text fw-semibold">
                  {file.file_name || `File ${index + 1}`}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => download_file_from_url(file.file_url)}
                  >
                    <i className="bi bi-download me-1" />
                    Download
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(file.file_message_id)}
                  >
                    <i className="bi bi-trash me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileList;
