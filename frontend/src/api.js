
const API_BASE = "http://localhost:8080"; // your Express backend

export async function upload_file(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return await res.json();
}

export async function get_file_list() {
  const res = await fetch(`${API_BASE}/get_files`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to fetch file list");
  return await res.json();
}

export async function delete_file(message_id) {
  const res = await fetch(`${API_BASE}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message_id }),
  });

  if (!res.ok) throw new Error("Failed to delete file");
  return await res.json();
}


export function download_file_from_url(url) {
  window.open(url, "_blank");
}
