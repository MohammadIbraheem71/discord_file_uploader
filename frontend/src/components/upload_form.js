import React, { useState, useRef } from "react";
import { upload_file } from "../api";

function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null); // 🔸 Create a ref for the file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus("Uploading...");
    try {
      await upload_file(file);
      setStatus("Upload successful!");
      setFile(null); // Clear the React state
      fileInputRef.current.value = ""; // 🔸 Clear the input itself
      onUploadSuccess(); // Trigger file list reload
    } catch (err) {
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="container my-4">
      <div className="upload-card p-4 shadow-sm">
        <h3 className="mb-3">Upload a File</h3>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-sm-row gap-2 align-items-start"
        >
          <input
            type="file"
            ref={fileInputRef} 
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
        {status && <p className="mt-2">{status}</p>}
      </div>
    </div>
  );
}

export default UploadForm;
