import prisma from "@/server/db";
import ProjectList from "./_components/ProjectList";

export default async function Home() {
  const projects = await prisma.project.findMany();
  return <ProjectList projects={projects} />;
}
