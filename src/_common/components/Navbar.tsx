"use client";

import { OrganizationSwitcher, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const u = useAuth();
  return (
    <div className="flex items-center justify-between px-10 py-2 border-b">
      <Link href={"/"}>Draws</Link>
      <pre>{JSON.stringify(u, null, 2)}</pre>
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
