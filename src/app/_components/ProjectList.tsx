"use client";

import { Button, Container, Modal, Skeleton, Title } from "@mantine/core";
import { modals } from "@mantine/modals";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDisclosure } from "@mantine/hooks";
import { Project } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProjectForm from "./ProjectForm";
import EmptyState from "@/_common/components/EmptyState";

interface Prop {}

const ProjectList: React.FC<Prop> = () => {
  const [modalOpened, modalHandler] = useDisclosure(false);
  const router = useRouter();
  const [editableProject, setEditableProject] = useState<Project | null>();

  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const api = await fetch("/api/projects");
      return api.json();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updateMutate, status: updateMutationStatus } = useMutation({
    mutationFn: async (data: Partial<Project>) => {
      await fetch(`/api/projects?id=${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      refetch();
      // router.refresh();
      modalHandler.close();
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
      refetch();
      // router.refresh();
      modalHandler.close();
    },
  });

  return (
    <>
      <Modal opened={modalOpened} onClose={modalHandler.close}>
        <ProjectForm
          loading={
            createMutationStatus === "pending" ||
            updateMutationStatus === "pending"
          }
          project={editableProject}
          onSubmit={(data) => {
            if (editableProject) {
              updateMutate({
                id: editableProject.id,
                name: data.name,
                description: data.description,
              });
              return;
            }
            createMutate({
              name: data.name,
              description: data.description,
            });
          }}
        />
      </Modal>
      <Container my={"lg"}>
        <div className="flex items-center justify-between">
          <Title order={3} my={"md"}>
            Projects
          </Title>
          <Button onClick={modalHandler.open}>Add New</Button>
        </div>
        {projects?.length === 0 && (
          <EmptyState label={"You have no project yet"} />
        )}
        <div className="grid gap-4 lg:grid-cols-4">
          {isLoading && (
            <>
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
            </>
          )}
          {projects?.map((project) => (
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
              onClickEdit={() => {
                setEditableProject(project);
                modalHandler.open();
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectList;
