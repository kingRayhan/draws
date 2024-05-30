"use client";
import React, { use, useEffect } from "react";

const page = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return <div>Switching org</div>;
};

export default page;
