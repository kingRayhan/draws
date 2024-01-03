import prisma from "@/server/db";
import React from "react";
import dynamic from "next/dynamic";

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
