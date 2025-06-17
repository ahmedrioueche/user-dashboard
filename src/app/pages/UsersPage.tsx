import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, updateUser } from "../../api/users";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/ui/Button";
import { UserFormValues } from "../../schemas/user";
import { User } from "../../types/user";
import toast from "react-hot-toast";
import { UserFilters } from "../components/UserFilter";
import { UserForm } from "../components/UserForm";
import { UserModal } from "../components/UserModal";
import { UserTable } from "../components/UserTable";
import { UserView } from "../components/UserView";
import { Plus, Loader2 } from "lucide-react";

const PAGE_SIZE = 5;

function UsersPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "create">("view");
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const filteredUsers = users.filter((user) => {
    const nameMatch = nameFilter
      ? `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(nameFilter.toLowerCase())
      : true;
    const roleMatch = roleFilter !== "all" ? user.role === roleFilter : true;
    return nameMatch && roleMatch;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    if (values.id) {
      updateMutation.mutate(values as User);
    } else {
      createMutation.mutate(values);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewMode("view");
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setViewMode("edit");
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setViewMode("create");
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setNameFilter("");
    setRoleFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 py-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            User Management
          </h1>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
          </p>
        </div>
        <Button
          onClick={handleAddUser}
          className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
  
      {/* Filters Section */}
      <div className="px-6 pb-4">
        <UserFilters
          nameFilter={nameFilter}
          roleFilter={roleFilter}
          onNameFilterChange={setNameFilter}
          onRoleFilterChange={setRoleFilter}
          onResetFilters={handleResetFilters}
        />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 overflow-hidden px-6 pb-2">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-light-primary dark:text-dark-primary" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Loading users...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden rounded-lg border border-light-border dark:border-dark-border">
              <UserTable
                users={paginatedUsers}
                onView={handleViewUser}
                onEdit={handleEditUser}
              />
            </div>
  
            {/* Pagination */}
            {totalPages > 1 && (
               <Pagination
               currentPage={currentPage}
               totalItems={users.length}
               itemsPerPage={PAGE_SIZE}
               onPageChange={setCurrentPage}
             />
            )}
          </div>
        )}
      </div>
  
      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          viewMode === "create"
            ? "Add New User"
            : viewMode === "edit"
            ? "Edit User"
            : "User Details"
        }
      >
        <div className="p-1">
          {viewMode === "view" && selectedUser ? (
            <UserView user={selectedUser} />
          ) : (
            <UserForm
              user={selectedUser || undefined}
              onSubmit={handleSubmit}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          )}
        </div>
      </UserModal>
    </div>
  );
}

export default UsersPage;
