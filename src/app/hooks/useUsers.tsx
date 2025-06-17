import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, updateUser } from "../../api/users";
import { User } from "../../types/user";
import toast from "react-hot-toast";
import { UserFormValues } from "@/schemas/user";

export function useUsers() {
  const queryClient = useQueryClient();
  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
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
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    if (values.id) {
      return updateMutation.mutateAsync(values as User);
    }
    return createMutation.mutateAsync(values);
  };

  return {
    users,
    isLoading,
    handleSubmit,
    isMutating: createMutation.isPending || updateMutation.isPending,
  };
}