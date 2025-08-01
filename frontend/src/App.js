// src/App.js
import React, { useState } from "react";
import UploadForm from "./components/upload_form";
import FileList from "./components/file_list";
import "./styles/custom.css";

function App() {
  const [reloadFlag, setReloadFlag] = useState(false);
  const triggerReload = () => setReloadFlag(!reloadFlag);

  return (
    <div className="main-wrapper">
      {/* Header */}
      <header className="text-center py-4">
        <img src="/D_uploads_nobg.png" alt="Discord File Uploader" className="logo mb-2" />
      </header>

      {/* Upload Form Section */}
      <section className="container mb-5">
        <UploadForm onUploadSuccess={triggerReload} />
      </section>

      {/* File List */}
      <FileList key={reloadFlag} />
    </div>
  );
}

export default App;
