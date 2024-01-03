import React from "react";
import prisma from "@/server/db";
import BoardList from "./_components/BoardList";

interface Props {
  params: {
    projectId: string;
  };
}
const ProjectBoards: React.FC<Props> = async ({ params }) => {
  const boards = await prisma.board.findMany({
    where: { projectId: params?.projectId },
  });

  return <BoardList boards={boards} />;
};

export default ProjectBoards;
