import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Dashboard from "./Pages/Dashboard";
import Arhiv from "./Pages/Arhiv";
import Account from "./Pages/Account";
import InboxDocuments from "./Pages/Documents/InboxDocuments";
import OutDocuments from "./Pages/Documents/OutDocuments";
import NewDocument from "./Pages/NewDocument";
import DocumentDetail from "./Pages/DocumentDetail";
import DeletedDocuments from "./Pages/Documents/DeletedDocuments";
import Login from "./layouts/LogIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LandingPageLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/arhiv",
          element: <Arhiv />,
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
          path: "/document/deleted",
          element: <DeletedDocuments />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
