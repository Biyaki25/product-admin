import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </section>
  );
}

export default NotFound;