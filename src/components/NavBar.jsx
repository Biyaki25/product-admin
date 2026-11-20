import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="nav">
      <NavLink className="brand" to="/">Daniel</NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects" end>Projects</NavLink>
        <NavLink to="/projects/new">Add Project</NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
