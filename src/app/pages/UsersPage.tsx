import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/ui/Button";
import { UserFilters } from "../components/UserFilter";
import { UserForm } from "../components/UserForm";
import { UserModal } from "../components/UserModal";
import { UserTable } from "../components/UserTable";
import { UserView } from "../components/UserView";
import { Plus, Loader2 } from "lucide-react";
import { useUserFilters } from "../hooks/useUserFilters";
import { useUserModal } from "../hooks/useUserModal";
import { useUsers } from "../hooks/useUsers";
import { PAGE_SIZE } from "@/constants/general";


function UsersPage() {
  const { users, isLoading, handleSubmit, isMutating } = useUsers();
  const { 
    nameFilter, 
    roleFilter, 
    filteredUsers, 
    setNameFilter, 
    setRoleFilter, 
    handleResetFilters 
  } = useUserFilters(users);
  const { 
    isOpen, 
    selectedUser, 
    viewMode, 
    handleViewUser, 
    handleEditUser, 
    handleAddUser, 
    handleClose 
  } = useUserModal();
  const { 
    currentPage, 
    setCurrentPage, 
    getPaginatedItems, 
    totalPages 
  } = usePagination(PAGE_SIZE);

  const paginatedUsers = getPaginatedItems(filteredUsers);
  const totalPagesCount = totalPages(filteredUsers.length);

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 py-0 pb-2">
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
          <Plus className="mr-1 h-4 w-4" />
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
            {totalPagesCount > 1 && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
                itemsPerPage={PAGE_SIZE}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
  
      {/* User Modal */}
      <UserModal
        isOpen={isOpen}
        onClose={handleClose}
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
              isLoading={isMutating}
            />
          )}
        </div>
      </UserModal>
    </div>
  );
}

export default UsersPage;