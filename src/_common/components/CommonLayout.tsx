import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const CommonLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default CommonLayout;
