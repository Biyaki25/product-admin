import { useState } from "react";
import { useProjectsContext } from "../context/ProjectsContext";
import ProjectCard from "../components/ProjectCard";

function ProjectList() {
  const { projects, loading, error } = useProjectsContext();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = projects.filter((project) =>
    `${project.title} ${project.category} ${project.technologies}`.toLowerCase().includes(q)
  );

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <p className="eyebrow">Selected work</p>
      <h1>Projects</h1>
      <label htmlFor="search">Search projects</label>
      <input
        id="search"
        type="search"
        placeholder="Search by title, category, or technology"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {visible.length === 0 ? (
        <p>No projects match your search.</p>
      ) : (
        <ul className="grid">
          {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
        </ul>
      )}
    </section>
  );
}

export default ProjectList;
