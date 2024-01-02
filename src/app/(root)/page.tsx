import EmptyState from "@/_common/components/EmptyState";
import prisma from "@/server/db";
import { Inter } from "next/font/google";
import ProjectList from "./_components/ProjectList";

export default async function Home() {
  const projects = await prisma.project.findMany();
  return <ProjectList projects={projects} />;
}
