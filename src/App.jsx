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
import Account from "./Pages/Account";
import InboxDocuments from "./Pages/Documents/InboxDocuments";
import OutDocuments from "./Pages/Documents/OutDocuments";
import NewDocument from "./Pages/NewDocument";
import DocumentDetail from "./Pages/DocumentDetail";
import ArchiveDocuments from "./Pages/Documents/ArchiveDocuments";
import Login from "./layouts/LogIn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "./Components/db/Redux/api/store";
import useRefreshToken from "./Components/db/Redux/api/refreshToken";

function App() {
  const refToken = store.getState().refreshToken;
  const refresh = useRefreshToken();

  useEffect(() => {
    useRefreshToken();
  }, [refToken]);

  const ProtectedRoute = ({ children }) => {
    // const isLoggedIn = useSelector((state) => state.auth.user == null);
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }

    return children; // Render child component if logged in
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
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
          element: <Dashboard />,
        },

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
          path: "/new",
          element: <NewDocument />,
        },
        {
          path: "/document/:name/:id",
          element: <DocumentDetail />,
        },
        {
          path: "/document/archive",
          element: <ArchiveDocuments />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
