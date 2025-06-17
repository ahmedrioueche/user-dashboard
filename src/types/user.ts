export type UserRole = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  comment?: string;
}
