"use client";
import { MainMenu } from "@excalidraw/excalidraw";
import React from "react";

const Menu = () => {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.ToggleTheme />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
};

export default Menu;
