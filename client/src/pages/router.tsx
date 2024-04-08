import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Room } from "./Room/Room";
import { Home } from "./Home/Home";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import { Layout } from "./Layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "room/:roomId",
            element: <Room />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
