import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-2 border-b">
      <Link href={"/"}>Draws</Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
