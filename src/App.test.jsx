import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ProjectsProvider } from "./context/ProjectsContext";

const projects = [
  { id: 1, title: "TaskFlow", category: "Full Stack", year: 2026, description: "Task manager.", technologies: "React, Node.js", image: "a.jpg" },
  { id: 2, title: "Weatherly", category: "Frontend", year: 2025, description: "Weather dashboard.", technologies: "React, CSS", image: "b.jpg" },
];

beforeEach(() => {
  global.fetch = vi.fn((url, opts = {}) => {
    const reply = (data) => Promise.resolve({ ok: true, json: () => Promise.resolve(data) });
    if (opts.method === "POST") return reply({ id: 99, ...JSON.parse(opts.body) });
    if (opts.method === "PATCH") return reply({ ...projects[0], ...JSON.parse(opts.body) });
    if (opts.method === "DELETE") return reply({});
    return reply(projects);
  });
});

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ProjectsProvider><App /></ProjectsProvider>
    </MemoryRouter>
  );
}

test("home page introduces the developer and links to projects", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: /build thoughtful digital experiences/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view my work/i })).toBeInTheDocument();
});

test("project list loads projects from the backend", async () => {
  renderAt("/projects");
  expect(await screen.findByText("TaskFlow")).toBeInTheDocument();
  expect(screen.getByText("Weatherly")).toBeInTheDocument();
});

test("search filters the project list", async () => {
  renderAt("/projects");
  await screen.findByText("TaskFlow");
  await userEvent.type(screen.getByLabelText(/search projects/i), "weather");
  expect(screen.getByText("Weatherly")).toBeInTheDocument();
  expect(screen.queryByText("TaskFlow")).not.toBeInTheDocument();
});

test("add form shows an error when required fields are empty", async () => {
  renderAt("/projects/new");
  await userEvent.click(screen.getByRole("button", { name: /add project/i }));
  expect(screen.getByRole("alert")).toBeInTheDocument();
});

test("add form creates a project and shows it in the list", async () => {
  renderAt("/projects/new");
  await screen.findByRole("heading", { name: /add a project/i });
  await userEvent.type(screen.getByLabelText("Title"), "Portfolio CMS");
  await userEvent.type(screen.getByLabelText("Category"), "Full Stack");
  await userEvent.click(screen.getByRole("button", { name: /add project/i }));
  expect(await screen.findByText("Portfolio CMS")).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:3001/projects",
    expect.objectContaining({ method: "POST" })
  );
});

test("detail page updates project details with a PATCH request", async () => {
  renderAt("/projects/1");
  const technologies = await screen.findByLabelText("Technologies");
  await userEvent.clear(technologies);
  await userEvent.type(technologies, "React, Supabase");
  await userEvent.click(screen.getByRole("button", { name: /save changes/i }));
  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:3001/projects/1",
    expect.objectContaining({ method: "PATCH" })
  );
});

test("delete removes the project and returns to the list", async () => {
  renderAt("/projects/1");
  await userEvent.click(await screen.findByRole("button", { name: /delete project/i }));
  expect(await screen.findByRole("heading", { name: "Projects" })).toBeInTheDocument();
  expect(screen.queryByText("TaskFlow")).not.toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:3001/projects/1",
    expect.objectContaining({ method: "DELETE" })
  );
});

test("unknown routes show the not found page", () => {
  renderAt("/does-not-exist");
  expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
});
