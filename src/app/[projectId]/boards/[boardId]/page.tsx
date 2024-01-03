"use client";

import DrawBoard from "@/_common/components/DrawingBoard";
import React from "react";

interface Prop {
  params: {
    projectId: string;
    boardId: string;
  };
}

const BoardDetailsPage: React.FC<Prop> = ({ params }) => {
  return <DrawBoard projectId={params.projectId} boardId={params.boardId} />;
};

export default BoardDetailsPage;
