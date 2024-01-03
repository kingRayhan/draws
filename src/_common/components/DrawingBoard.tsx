"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import DrawingMenu from "./DrawingMenu";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { Board } from "@prisma/client";

const Excalidraw = React.memo(
  dynamic(async () => (await import("@excalidraw/excalidraw")).Excalidraw, {
    ssr: false,
  })
);

interface Prop {
  boardId: string;
  initialData?: { elements: string; appStates: string };
}

const DrawingBoard: React.FC<Prop> = ({ initialData, boardId }) => {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  const debouncedHandleOnChange = debounce(async () => {
    await fetch(`/api/boards?id=${boardId}`, {
      method: "PATCH",
      body: JSON.stringify({
        elements: JSON.stringify(api?.getSceneElements()),
        appStates: JSON.stringify(api?.getAppState()),
      }),
    });
    console.log("debounced");
  }, 500);

  return (
    <div className="h-[100vh]">
      <Excalidraw
        excalidrawAPI={setApi}
        onChange={debouncedHandleOnChange}
        initialData={{ elements: JSON.parse(initialData?.elements ?? "[]") }}
      >
        <DrawingMenu />
      </Excalidraw>
    </div>
  );
};

export default React.memo(DrawingBoard);
