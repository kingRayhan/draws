import { useAuth } from "@clerk/nextjs";

export const can = (
  privilege: "org:admin" | "org:member" | "org:can_edit" | "org:can_view"
) => {
  const { isLoaded, orgRole, orgId } = useAuth();
  if (!isLoaded) return false;
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
