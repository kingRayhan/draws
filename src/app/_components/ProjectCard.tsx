"use client";
import { can } from "@/_common/utils/can.client";
import { Button, Menu, Paper, Text, Title } from "@mantine/core";
import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { TbDotsVertical } from "react-icons/tb";

interface Prop {
  project: Project;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

const ProjectCard: React.FC<Prop> = ({
  project,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <Paper withBorder p={"md"}>
      <div className="flex items-start justify-between">
        <Title order={4}>
          <Link href={`/${project.id}/boards`}>{project.name}</Link>
        </Title>
        {can("org:can_edit") ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button>
                <TbDotsVertical />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={onClickEdit}>Edit</Menu.Item>
              {can("org:admin") && (
                <Menu.Item onClick={onClickDelete}>Delete</Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </div>
      <Text>{project?.description}</Text>
    </Paper>
  );
};

export default ProjectCard;
