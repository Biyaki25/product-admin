import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectsContext } from "../context/ProjectsContext";

const emptyForm = {
  title: "", category: "", year: new Date().getFullYear(), description: "",
  technologies: "", image: "", liveUrl: "", githubUrl: "",
};

function AddProject() {
  const { addProject } = useProjectsContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim()) {
      setError("Title and category are required.");
      return;
    }
    await addProject({
      ...form,
      year: Number(form.year),
      image: form.image || "https://picsum.photos/seed/project/600/400",
    });
    navigate("/projects");
  }

  return (
    <section>
      <p className="eyebrow">Portfolio editor</p>
      <h1>Add a project</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />
        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={form.category} onChange={handleChange} />
        <label htmlFor="year">Year</label>
        <input id="year" name="year" type="number" value={form.year} onChange={handleChange} />
        <label htmlFor="technologies">Technologies</label>
        <input id="technologies" name="technologies" value={form.technologies} onChange={handleChange} />
        <label htmlFor="image">Image URL</label>
        <input id="image" name="image" value={form.image} onChange={handleChange} />
        <label htmlFor="liveUrl">Live URL</label>
        <input id="liveUrl" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
        <label htmlFor="githubUrl">GitHub URL</label>
        <input id="githubUrl" name="githubUrl" value={form.githubUrl} onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} />
        {error && <p role="alert" className="error">{error}</p>}
        <button className="btn" type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default AddProject;
