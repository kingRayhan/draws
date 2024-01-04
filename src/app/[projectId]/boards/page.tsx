import React from "react";
import BoardList from "./_components/BoardList";

interface Props {
  params: { projectId: string };
}
const ProjectBoards: React.FC<Props> = ({ params }) => {
  return <BoardList projectId={params.projectId} />;
};

export default ProjectBoards;
