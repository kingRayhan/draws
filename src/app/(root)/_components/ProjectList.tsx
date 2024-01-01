"use client";

import { Button, Container, Modal, Title } from "@mantine/core";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useDisclosure } from "@mantine/hooks";

const ProjectList = () => {
  const [modalOpened, modalHandler] = useDisclosure(false);

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
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </Container>
    </>
  );
};

export default ProjectList;
