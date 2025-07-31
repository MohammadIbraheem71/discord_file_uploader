// src/components/UploadForm.js
import React, { useState } from "react";
import { upload_file } from "../api";

function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus("Uploading...");
    try {
      await upload_file(file);
      setStatus("Upload successful!");
      setFile(null);
      onUploadSuccess(); // Refresh file list
    } catch (err) {
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="container my-4">
      <h3>Upload a File</h3>
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}

export default UploadForm;
