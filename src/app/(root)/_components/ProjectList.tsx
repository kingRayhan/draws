"use client";

import { Button, Container, Modal, Title } from "@mantine/core";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useDisclosure } from "@mantine/hooks";
import { Project } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  return (
    <>
      <Modal opened={modalOpened} onClose={modalHandler.close}>
        {/* Modal content */}
      </Modal>
      <Container my={"lg"}>
        <div className="flex items-center justify-between">
          <Title order={3} my={"md"}>
            Projects
          </Title>
          <Button onClick={modalHandler.open}>Add New</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClickDelete={() => {
                deleteMutate(project.id);
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectList;
