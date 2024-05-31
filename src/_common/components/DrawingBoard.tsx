"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import DrawingMenu from "./DrawingMenu";
import { useAuth } from "@clerk/nextjs";

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
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>();
  const { orgId, orgRole } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: string) =>
      await fetch(`/api/boards?id=${data}`, {
        method: "PATCH",
        body: JSON.stringify({
          elements: JSON.stringify(api?.getSceneElements()),
          appStates: JSON.stringify(api?.getAppState()),
        }),
      }),
  });
  const debouncedHandleOnChange = debounce(async () => {
    toast.promise(mutateAsync(boardId), {
      loading: "Saving",
      success: "Saved",
      error: "Something went wrong",
    });
  }, 500);

  const ExcaliDrawMemo = useMemo(() => {
    return (
      <Excalidraw
        excalidrawAPI={setApi}
        viewModeEnabled={Boolean(orgId && orgRole === "org:can_view")}
        onChange={debouncedHandleOnChange}
        initialData={{ elements: JSON.parse(initialData?.elements ?? "[]") }}
      >
        <DrawingMenu />
      </Excalidraw>
    );
  }, [initialData]);

  return <div className="h-[100vh]">{ExcaliDrawMemo}</div>;
};

export default React.memo(DrawingBoard);
