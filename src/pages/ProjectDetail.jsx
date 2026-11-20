import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProjectsContext } from "../context/ProjectsContext";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading, updateProject, deleteProject } = useProjectsContext();
  const project = projects.find((item) => String(item.id) === id);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");

  useEffect(() => {
    if (project) {
      setDescription(project.description || "");
      setTechnologies(project.technologies || "");
    }
  }, [project]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found. <Link to="/projects">Back to projects</Link></p>;

  function handleSave(e) {
    e.preventDefault();
    updateProject(project.id, { description, technologies });
  }

  async function handleDelete() {
    await deleteProject(project.id);
    navigate("/projects");
  }

  return (
    <section className="detail">
      <img src={project.image} alt={project.title} />
      <div>
        <span className="tag">{project.category} · {project.year}</span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <p className="technologies">{project.technologies}</p>
        <div className="project-links">
          {project.liveUrl && <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">View live</a>}
          {project.githubUrl && <a className="btn secondary" href={project.githubUrl} target="_blank" rel="noreferrer">Source code</a>}
        </div>
        <form onSubmit={handleSave}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="technologies">Technologies</label>
          <input id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
          <button className="btn" type="submit">Save changes</button>
        </form>
        <button className="btn danger" onClick={handleDelete}>Delete project</button>
      </div>
    </section>
  );
}

export default ProjectDetail;
