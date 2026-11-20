import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Hello, I'm Daniel</p>
      <h1>I build thoughtful digital experiences.</h1>
      <p>
        I'm a full-stack developer focused on accessible interfaces,
        dependable applications, and polished user experiences.
      </p>
      <div className="hero-actions">
        <Link className="btn" to="/projects">View my work</Link>
        <Link className="btn secondary" to="/projects/new">Add a project</Link>
      </div>
      <div className="skills" aria-label="Skills">
        <span>React</span><span>JavaScript</span><span>Node.js</span><span>CSS</span>
      </div>
    </section>
  );
}

export default Home;
