import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import UsersPage from "../app/pages/UsersPage";

export const rootRoute = createRootRoute({
  component: () => <DashboardLayout />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <UsersPage />,
});

export const routeTree = rootRoute.addChildren([dashboardRoute]);

export const router = createRouter({
  routeTree,
});
