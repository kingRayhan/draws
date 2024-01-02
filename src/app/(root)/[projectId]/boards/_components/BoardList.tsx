"use client";

import EmptyState from "@/_common/components/EmptyState";
import { Button, Container, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { use, useState } from "react";
import BoardCard from "./BoardCard";
import { modals } from "@mantine/modals";
import BoardForm from "./BoardForm";

interface Prop {
  boards: Board[];
}

const BoardList: React.FC<Prop> = ({ boards }) => {
  const [modalOpened, modalHandler] = useDisclosure(false);
  const router = useRouter();
  const params = useParams();
  const [editableBoard, setEditableBoard] = useState<Board | null>();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/boards?id=${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: async (data: Partial<Board>) => {
      await fetch(`/api/boards?id=${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.refresh();
      modalHandler.close();
    },
  });

  const { mutate: createMutate, status: createMutationStatus } = useMutation({
    mutationFn: async (data: Partial<Board>) => {
      await fetch(`/api/boards`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: async () => {
      router.refresh();
      modalHandler.close();
    },
  });

  return (
    <>
      <Modal opened={modalOpened} onClose={modalHandler.close}>
        <BoardForm
          loading={createMutationStatus === "pending"}
          board={editableBoard}
          onSubmit={(data) => {
            if (editableBoard) {
              updateMutate({
                id: editableBoard.id,
                name: data.name,
                description: data.description,
              });
              return;
            }
            createMutate({
              name: data.name,
              description: data.description,
              projectId: params?.projectId as string,
            });
          }}
        />
      </Modal>
      <Container my={"lg"}>
        <div className="flex items-center justify-between">
          <Title order={3} my={"md"}>
            Projects/{params.projectId}
          </Title>
          <Button onClick={modalHandler.open}>Add New</Button>
        </div>
        {boards.length === 0 && (
          <EmptyState label={"You have no board yet in this project"} />
        )}
        <div className="grid gap-4 lg:grid-cols-4">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onClickDelete={() => {
                modals.openConfirmModal({
                  title: "Delete Project",
                  children: "Are you sure you want to delete this project?",
                  labels: { cancel: "Cancel", confirm: "Delete" },
                  confirmProps: { color: "red" },
                  onConfirm: () => {
                    deleteMutate(board.id);
                  },
                });
              }}
              onClickEdit={() => {
                setEditableBoard(board);
                modalHandler.open();
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default BoardList;
