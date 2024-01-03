"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import DrawingMenu from "./DrawingMenu";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { Board } from "@prisma/client";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

interface Prop {
  projectId: string;
  boardId: string;
  onSaved?: (data: { elements: string; appStates: string }) => void;
}

const DrawingBoard: React.FC<Prop> = ({ projectId, boardId, onSaved }) => {
  // const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  const debouncedHandleOnChange = debounce(() => {
    if (api) {
      onSaved?.({
        elements: JSON.stringify(api.getSceneElements()),
        appStates: JSON.stringify(api.getAppState()),
      });
    }
  }, 3000);

  return (
    <div className="h-[100vh]">
      <Excalidraw excalidrawAPI={setApi} onChange={debouncedHandleOnChange}>
        <DrawingMenu />
      </Excalidraw>
    </div>
  );
};

export default DrawingBoard;
