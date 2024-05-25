import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login/Login";
import { Room } from "./Room/Room";
import { Home } from "./Home/Home";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import { AuthLayout } from "./Layout/AuthLayout";
import { WithPaper } from "./Layout/WithPaper";
import { RoomSettings } from "./RoomSettings/RoomSettings";
import { WordKit } from "./WordKit/WordKit";
import { RoomLayout } from "./Room/RoomLayout";

const roomRoutes = [
  {
    path: "room/:roomId",
    element: <Room />,
  },
  {
    path: "room/:roomId/settings",
    element: <RoomSettings />,
  },
  {
    path: "room/:roomId/word-kit",
    element: <WordKit />,
  },
];

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <WithPaper />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                element: <RoomLayout />,
                children: roomRoutes,
              },
            ],
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
