import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/Select";
import { Search } from "lucide-react";

interface UserFiltersProps {
  nameFilter: string;
  roleFilter: string;
  onNameFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onResetFilters: () => void;
}

export function UserFilters({
  nameFilter,
  roleFilter,
  onNameFilterChange,
  onRoleFilterChange,
  onResetFilters,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-light-background dark:bg-dark-background rounded-lg border border-light-border dark:border-dark-border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
        <Input
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
          className="pl-9 bg-input"
        />
      </div>

      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-[180px] bg-input">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent className="bg-light-background border-light-border dark:border-dark-border">
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={onResetFilters}
        className="bg-light-accent/10 dark:bg-dark-accent/10 hover:bg-light-accent/20 dark:hover:bg-dark-accent/20"
      >
        Reset Filters
      </Button>
    </div>
  );
}
