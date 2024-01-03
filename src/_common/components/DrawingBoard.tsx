"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import DrawingMenu from "./DrawingMenu";
import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

interface Prop {
  projectId: string;
  boardId: string;
}

const DrawingBoard: React.FC<Prop> = ({ projectId, boardId }) => {
  // const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  const debouncedHandleOnChange = debounce(() => {
    if (api) {
      console.log(api.getSceneElements());
    }
  }, 1000);

  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) =>
  //     setExcalidraw(comp.Excalidraw)
  //   );
  // }, []);

  return (
    <div className="h-[100vh]">
      <Excalidraw excalidrawAPI={setApi} onChange={debouncedHandleOnChange}>
        <DrawingMenu />
      </Excalidraw>
    </div>
  );
};

export default DrawingBoard;
