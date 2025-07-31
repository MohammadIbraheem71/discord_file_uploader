// src/App.js
import React, { useState } from "react";
import UploadForm from "./components/upload_form";
import FileList from "./components/file_list";

function App() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const triggerReload = () => setReloadFlag(!reloadFlag);

  return (
    <div>
      <h1 className="text-center my-4">📁 Discord File Uploader</h1>
      <UploadForm onUploadSuccess={triggerReload} />
      <FileList key={reloadFlag} />
    </div>
  );
}

export default App;
