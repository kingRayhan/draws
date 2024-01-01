"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
// import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function DrawBoard() {
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  // const debouncedHandleOnChange = debounce(() => {
  //   if (api) {
  //     console.log(api.getSceneElements());
  //   }
  // }, 1000);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  return (
    <div className="h-[100vh]">
      {Excalidraw && (
        <Excalidraw excalidrawAPI={setApi}>
          <Menu />
        </Excalidraw>
      )}
    </div>
  );
}
