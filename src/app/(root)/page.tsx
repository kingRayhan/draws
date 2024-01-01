import { Inter } from "next/font/google";
import ProjectList from "./_components/ProjectList";
import prisma from "@/server/db";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const projects = await prisma.project.findMany();
  return <ProjectList />;
}
