import { User } from "../../types/user";
import { Badge } from "../../components/ui/badge";

interface UserViewProps {
  user: User;
}

export function UserView({ user }: UserViewProps) {
  const roleVariantMap = {
    admin:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    viewer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
            First Name
          </h3>
          <p className="text-lg text-light-text-primary dark:text-dark-text-primary">
            {user.firstname}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
            Last Name
          </h3>
          <p className="text-lg text-light-text-primary dark:text-dark-text-primary">
            {user.lastname}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
          Email
        </h3>
        <p className="text-lg text-light-text-primary dark:text-dark-text-primary">
          {user.email}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
          Role
        </h3>
        <Badge
          className={`${
            roleVariantMap[user.role]
          } mt-1 rounded-full px-3 py-1 text-xs font-medium`}
        >
          {user.role}
        </Badge>
      </div>

      {user.comment && (
        <div>
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
            Comment
          </h3>
          <p className="text-light-text-primary dark:text-dark-text-primary">
            {user.comment}
          </p>
        </div>
      )}
    </div>
  );
}
