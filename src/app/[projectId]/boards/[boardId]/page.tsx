"use client";

import DrawBoard from "@/_common/components/DrawingBoard";
import { Board } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";

interface Prop {
  params: {
    projectId: string;
    boardId: string;
  };
}

const BoardDetailsPage: React.FC<Prop> = ({ params }) => {
  const { mutate } = useMutation({
    mutationFn: async (data: Partial<Board>) => {
      await fetch(`/api/boards?id=${params.boardId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const handleUpdateBoard = useCallback(
    (data: { elements: string; appStates: string }) => {
      console.log("Updating board", data);
      mutate({
        elements: data.elements,
        appStates: data.appStates,
      });
    },
    []
  );

  return (
    <DrawBoard
      projectId={params.projectId}
      boardId={params.boardId}
      onSaved={handleUpdateBoard}
    />
  );
};

export default BoardDetailsPage;
