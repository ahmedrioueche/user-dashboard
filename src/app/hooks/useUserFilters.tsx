import { useState } from "react";
import { User } from "../../types/user";

export function useUserFilters(users: User[]) {
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const nameMatch = nameFilter
      ? `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(nameFilter.toLowerCase())
      : true;
    const roleMatch = roleFilter !== "all" ? user.role === roleFilter : true;
    return nameMatch && roleMatch;
  });

  const handleResetFilters = () => {
    setNameFilter("");
    setRoleFilter("all");
  };

  return {
    nameFilter,
    roleFilter,
    filteredUsers,
    setNameFilter,
    setRoleFilter,
    handleResetFilters,
  };
}