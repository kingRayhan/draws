"use client";

import { useOrganizationList } from "@clerk/nextjs";

export const CustomOrganizationSwitcher = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!isLoaded) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Custom Organization Switcher</h1>
      <ul className="flex flex-col gap-2">
        {userMemberships.data?.map((mem) => (
          <li key={mem.id}>
            <span>{mem.organization.name}</span>
            <button
              onClick={() => setActive({ organization: mem.organization.id })}
            >
              Select
            </button>
          </li>
        ))}
      </ul>

      <button
        disabled={!userMemberships.hasNextPage}
        onClick={() => userMemberships.fetchNext()}
      >
        Load more organizations
      </button>
    </>
  );
};
