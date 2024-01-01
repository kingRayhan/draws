"use client";

import { MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useState, useEffect } from "react";

export default function DrawBoard() {
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  return (
    <div className="h-[100vh]">
      {Excalidraw && (
        <Excalidraw
          excalidrawAPI={setApi}
          onChange={console.log}
          UIOptions={{
            canvasActions: { loadScene: false, saveAsImage: false },
          }}
        >
          {/* <MainMenu>
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.Socials />
            <MainMenu.DefaultItems.Export />
          </MainMenu> */}
        </Excalidraw>
      )}
    </div>
  );
}
