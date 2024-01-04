import prisma from "@/server/db";
import dynamic from "next/dynamic";
import React from "react";

const DrawBoard = dynamic(
  async () => await import("@/_common/components/DrawingBoard"),
  { ssr: false }
);

interface Prop {
  params: {
    projectId: string;
    boardId: string;
  };
}

export async function generateMetadata({ params }: Prop) {
  const board = await prisma.board.findUnique({
    where: { id: params.boardId },
    include: { project: { select: { name: true } } },
  });

  return {
    title: `${board?.name} - ${board?.project?.name}`,
  };
}

const BoardDetailsPage: React.FC<Prop> = async ({ params }) => {
  const board = await prisma.board.findUnique({
    where: { id: params.boardId },
  });

  return (
    <>
      <DrawBoard
        boardId={params.boardId}
        initialData={{
          appStates: board?.appStates || "{}",
          elements: board?.elements || "[]",
        }}
      />
    </>
  );
};

export default BoardDetailsPage;
