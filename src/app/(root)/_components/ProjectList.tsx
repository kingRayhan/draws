"use client";

import { Button, Container, Modal, Title } from "@mantine/core";
import { modals } from "@mantine/modals";

import React from "react";
import ProjectCard from "./ProjectCard";
import { useDisclosure } from "@mantine/hooks";
import { Project } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProjectForm from "./ProjectForm";
import EmptyState from "@/_common/components/EmptyState";

interface Prop {
  projects: Project[];
}

const ProjectList: React.FC<Prop> = ({ projects }) => {
  const [modalOpened, modalHandler] = useDisclosure(false);
  const router = useRouter();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      await fetch(`/api/projects`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: createMutate, status: createMutationStatus } = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      await fetch(`/api/projects`, {
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
        <ProjectForm
          loading={createMutationStatus === "pending"}
          onSubmit={(data) =>
            createMutate({
              name: data.name,
              description: data.description,
            })
          }
        />
      </Modal>
      <Container my={"lg"}>
        <div className="flex items-center justify-between">
          <Title order={3} my={"md"}>
            Projects
          </Title>
          <Button onClick={modalHandler.open}>Add New</Button>
        </div>
        {projects.length === 0 && (
          <EmptyState label={"You have no project yet"} />
        )}
        <div className="grid gap-4 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClickDelete={() => {
                modals.openConfirmModal({
                  title: "Delete Project",
                  children: "Are you sure you want to delete this project?",
                  labels: { cancel: "Cancel", confirm: "Delete" },
                  confirmProps: { color: "red" },
                  onConfirm: () => {
                    deleteMutate(project.id);
                  },
                });
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectList;
