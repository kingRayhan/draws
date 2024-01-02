import { Container, Skeleton, Title } from "@mantine/core";
import React from "react";

const loading = () => {
  return (
    <Container my={"lg"}>
      <div className="flex items-center justify-between">
        <Title order={3} my={"md"}>
          Projects
        </Title>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </div>
    </Container>
  );
};

export default loading;
