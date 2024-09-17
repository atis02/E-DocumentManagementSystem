import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";
import Account from "./Pages/Account";
import Notification from "./Pages/Notification";
import Employees from "./Pages/Employees";
import InboxDocuments from "./Pages/Documents/InboxDocuments";
import OutDocuments from "./Pages/Documents/OutDocuments";
import NewDocument from "./Pages/NewDocument";
import DocumentDetail from "./Pages/DocumentDetail";
import DocumentDetailOut from "./Pages/DocumentDetailOut";
import ArchiveDocuments from "./Pages/Documents/ArchiveDocuments";
import Chat from "./Pages/Chat";
import Login from "./layouts/LogIn";
import { lazy, Suspense, useEffect, useState } from "react";
import Register from "./layouts/Register";
import { Stack } from "@mui/material";

function App() {
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("CRM_USER");

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }
    return children; // Render child component if logged in
  };
  const LandingPageLayout = lazy(() => import("./layouts/LandingPageLayout"));

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LandingPageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Main />,
        },
        // {
        //   path: "/dashboard",
        //   element: <Dashboard />,
        // },

        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "document/inbox",
          element: <InboxDocuments />,
        },
        {
          path: "document/out",
          element: <OutDocuments />,
        },
        {
          path: "/document/new",
          element: <NewDocument />,
        },
        {
          path: "/document/inbox/:id",
          element: <DocumentDetail />,
        },
        {
          path: "/document/out/:id",
          element: <DocumentDetailOut />,
        },
        {
          path: "/document/archive",
          element: <ArchiveDocuments />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },

        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/notifications",
          element: <Notification />,
        },
      ],
    },
  ]);

  return (
    <Suspense
      fallback={
        <Stack justifyContent="center" alignItems="center" height="100vh">
          <img
            src="/images/spinner.svg"
            style={{ width: 60, height: 60 }}
            alt="loader"
          />
        </Stack>
      }
    >
      <RouterProvider router={router} style={{ minHeight: "100vh" }} />
    </Suspense>
  );
}

export default App;
