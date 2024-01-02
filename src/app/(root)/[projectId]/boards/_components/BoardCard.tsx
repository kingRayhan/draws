import { Menu, Paper, Text, Title } from "@mantine/core";
import { Board } from "@prisma/client";
import React from "react";
import { TbDotsVertical } from "react-icons/tb";

interface Prop {
  board: Board;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

const BoardCard: React.FC<Prop> = ({ board, onClickDelete, onClickEdit }) => {
  return (
    <Paper withBorder p={"md"}>
      <div className="flex justify-between">
        <Title order={4}>{board.name}</Title>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button>
              <TbDotsVertical />
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={onClickEdit}>Edit</Menu.Item>
            <Menu.Item onClick={onClickDelete}>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Text>{board?.description}</Text>
    </Paper>
  );
};

export default BoardCard;
