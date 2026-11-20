import { useEffect, useState } from "react";
import fallbackDb from "../../db.json";
const fallbackProjects = fallbackDb.projects;

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
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  async function addProject(project) {
    let created = { ...project, id: Date.now() };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (res.ok) created = await res.json();
    } catch {
      // GitHub Pages cannot run json-server, so keep the change in this session.
    }
    setProjects((prev) => [...prev, created]);
    return created;
  }

  async function updateProject(id, changes) {
    let updated = { id, ...changes };
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (res.ok) updated = await res.json();
    } catch {
      // GitHub Pages cannot run json-server, so keep the change in this session.
    }
    setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)));
    return updated;
  }

  async function deleteProject(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch {
      // GitHub Pages cannot run json-server, so keep the change in this session.
    }
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }

  return { projects, loading, error, addProject, updateProject, deleteProject };
}
