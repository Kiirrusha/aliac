import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Room } from "./Room/Room";
import { Home } from "./Home/Home";
import { Layout } from "./Layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
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
]);
