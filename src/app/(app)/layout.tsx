import CommonLayout from "@/_common/components/CommonLayout";
import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default layout;
