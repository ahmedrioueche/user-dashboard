import { User } from "../types/user";

const users: User[] = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    role: "admin",
    comment: "System administrator",
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    role: "editor",
    comment: "Content editor",
  },
  {
    id: "3",
    firstname: "Robert",
    lastname: "Johnson",
    email: "robert.j@example.com",
    role: "viewer",
    comment: "Needs view-only access",
  },
  {
    id: "4",
    firstname: "Emily",
    lastname: "Williams",
    email: "emily.w@example.com",
    role: "editor",
    comment: "Marketing content",
  },
  {
    id: "5",
    firstname: "Michael",
    lastname: "Brown",
    email: "michael.b@example.com",
    role: "admin",
    comment: "Technical lead",
  },
  {
    id: "6",
    firstname: "Sarah",
    lastname: "Davis",
    email: "sarah.d@example.com",
    role: "viewer",
    comment: "Client representative",
  },
  {
    id: "7",
    firstname: "David",
    lastname: "Miller",
    email: "david.m@example.com",
    role: "editor",
    comment: "Product documentation",
  },
  {
    id: "8",
    firstname: "Jennifer",
    lastname: "Wilson",
    email: "jennifer.w@example.com",
    role: "admin",
    comment: "HR administrator",
  },
  {
    id: "9",
    firstname: "Thomas",
    lastname: "Moore",
    email: "thomas.m@example.com",
    role: "viewer",
    comment: "External auditor",
  },
  {
    id: "10",
    firstname: "Lisa",
    lastname: "Taylor",
    email: "lisa.t@example.com",
    role: "editor",
    comment: "Social media manager",
  },
  {
    id: "11",
    firstname: "Christopher",
    lastname: "Anderson",
    email: "chris.a@example.com",
    role: "admin",
    comment: "Database administrator",
  },
  {
    id: "12",
    firstname: "Amanda",
    lastname: "Thomas",
    email: "amanda.t@example.com",
    role: "viewer",
    comment: "Quality assurance",
  },
  {
    id: "13",
    firstname: "Daniel",
    lastname: "Jackson",
    email: "daniel.j@example.com",
    role: "editor",
    comment: "Technical writer",
  },
  {
    id: "14",
    firstname: "Michelle",
    lastname: "White",
    email: "michelle.w@example.com",
    role: "admin",
    comment: "System architect",
  },
];

export const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(users), 500));
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = { ...user, id: Date.now().toString() };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const updateUser = async (user: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
      }
      resolve(user);
    }, 500);
  });
};
