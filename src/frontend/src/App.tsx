import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { FullPageLoader } from "./components/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

// Lazy pages
import { Suspense, lazy } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DepositPage = lazy(() => import("./pages/DepositPage"));
const WithdrawPage = lazy(() => import("./pages/WithdrawPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const AssetsPage = lazy(() => import("./pages/AssetsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function AppShell() {
  const { isAuthenticated, loginStatus } = useAuth();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (loginStatus === "logging-in" || loginStatus === "initializing") {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: AppShell });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const depositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deposit",
  component: DepositPage,
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/withdraw",
  component: WithdrawPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage,
});

const assetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assets",
  component: AssetsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  depositRoute,
  withdrawRoute,
  historyRoute,
  assetsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
