import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <li className="card">
      <img src={project.image} alt={project.title} loading="lazy" />
      <div className="card-body">
        <span className="tag">{project.category} · {project.year}</span>
        <h2><Link to={`/projects/${project.id}`}>{project.title}</Link></h2>
        <p>{project.description}</p>
        <p className="technologies">{project.technologies}</p>
      </div>
    </li>
  );
}

export default ProjectCard;
