import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/projects";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load projects");
        return res.json();
      })
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addProject(project) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const created = await res.json();
    setProjects((prev) => [...prev, created]);
    return created;
  }

  async function updateProject(id, changes) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    const updated = await res.json();
    setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)));
    return updated;
  }

  async function deleteProject(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }

  return { projects, loading, error, addProject, updateProject, deleteProject };
}
