import { auth } from "@clerk/nextjs";

export const can = (
  privilege: "org:admin" | "org:member" | "org:can_edit" | "org:can_view"
) => {
  const { userId, orgRole, orgId } = auth();

  if (!userId) return false;
  if (!orgId) return true;

  const privilegeHierarchy = [
    "org:can_view",
    "org:can_edit",
    "org:member",
    "org:admin",
  ];

  const userRoleIndex = privilegeHierarchy.indexOf(orgRole!);
  const requiredPrivilegeIndex = privilegeHierarchy.indexOf(privilege);

  return userRoleIndex >= requiredPrivilegeIndex;
};
