import React from "react";

interface Prop {
  params: {
    projectId: string;
    boardId: string;
  };
}
const BoardDetailsPage: React.FC<Prop> = ({ params }) => {
  return <pre>{JSON.stringify(params)}</pre>;
};

export default BoardDetailsPage;
