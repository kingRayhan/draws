"use client";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

import React from "react";

const DrawingBoard = () => {
  const [api, setApi] = React.useState<ExcalidrawImperativeAPI | null>(null);

  return (
    <div className="h-[100vh]">
      <Excalidraw
        excalidrawAPI={setApi}
        onChange={console.log}
        UIOptions={{ canvasActions: { loadScene: false, saveAsImage: false } }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ChangeCanvasBackground />
          <MainMenu.DefaultItems.Socials />
          <MainMenu.DefaultItems.Export />
        </MainMenu>
      </Excalidraw>
    </div>
  );
};

export default DrawingBoard;
