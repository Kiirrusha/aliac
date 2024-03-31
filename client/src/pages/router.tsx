import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Room } from "./Room";
import { Home } from "./Home";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "room/:roomId",
        element: <Room />,
      },
    ],
  },
]);
