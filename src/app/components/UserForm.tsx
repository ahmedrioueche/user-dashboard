import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormValues } from "../../schemas/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

interface UserFormProps {
  user?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  isLoading: boolean;
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      firstname: "",
      lastname: "",
      email: "",
      role: "viewer",
      comment: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-text-primary dark:text-dark-text-primary">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-text-primary dark:text-dark-text-primary">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-text-primary dark:text-dark-text-primary">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  {...field}
                  className="bg-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-text-primary dark:text-dark-text-primary">
                Role
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-light-background">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-light-background border-light-border dark:border-dark-border">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-text-primary dark:text-dark-text-primary">
                Comment (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional information..."
                  className="resize-none bg-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
