"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-2 border-b">
      <Link href={"/"}>Draws</Link>

      <div className="flex items-center gap-2">
        {/* <CustomOrganizationSwitcher /> */}
        <OrganizationSwitcher
          afterSelectOrganizationUrl={"/switch-org"}
          afterSelectPersonalUrl={"/switch-org"}
        />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
