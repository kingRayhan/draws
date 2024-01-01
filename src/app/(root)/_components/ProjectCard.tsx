"use client";
import { Button, Menu, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { TbDotsVertical } from "react-icons/tb";

const ProjectCard = () => {
  return (
    <Paper withBorder p={"md"}>
      <div className="flex justify-between">
        <Title order={4}>Project Title</Title>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button>
              <TbDotsVertical />
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas,
        laudantium!
      </Text>
    </Paper>
  );
};

export default ProjectCard;
