import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ProjectsProvider } from "./context/ProjectsContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </HashRouter>
  </React.StrictMode>
);
