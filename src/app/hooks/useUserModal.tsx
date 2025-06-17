// hooks/useUserModal.ts
import { useState } from "react";
import { User } from "../../types/user";

export function useUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "create">("view");

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewMode("view");
    setIsOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setViewMode("edit");
    setIsOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setViewMode("create");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedUser,
    viewMode,
    handleViewUser,
    handleEditUser,
    handleAddUser,
    handleClose,
  };
}