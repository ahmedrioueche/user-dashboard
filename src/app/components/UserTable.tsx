import { User } from "../../types/user";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
}

const roleVariantMap = {
  admin:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  viewer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export function UserTable({ users, onView, onEdit }: UserTableProps) {
  return (
    <div className="rounded-lg border border-light-border dark:border-dark-border shadow-sm overflow-hidden">
      <Table className="min-w-full">
        <TableHeader className="bg-light-secondary dark:bg-dark-secondary">
          <TableRow>
            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
              First Name
            </TableHead>
            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
              Last Name
            </TableHead>
            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
              Email
            </TableHead>
            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
              Role
            </TableHead>
            <TableHead className="text-right text-light-text-primary dark:text-dark-text-primary">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-light-secondary/20 dark:hover:bg-dark-secondary/20 transition-colors"
            >
              <TableCell className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {user.firstname}
              </TableCell>
              <TableCell className="text-light-text-primary dark:text-dark-text-primary">
                {user.lastname}
              </TableCell>
              <TableCell className="text-light-text-secondary dark:text-dark-text-secondary">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    roleVariantMap[user.role]
                  } rounded-full px-3 py-1 text-xs font-medium`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-light-accent/20 dark:hover:bg-dark-accent/20"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border"
                  >
                    <DropdownMenuItem
                      onClick={() => onView(user)}
                      className="cursor-pointer hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
                    >
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(user)}
                      className="cursor-pointer hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
                    >
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
