import { allProjects } from "content-collections";

export const projects = [...allProjects].sort((a, b) =>
  b.date.localeCompare(a.date),
);
