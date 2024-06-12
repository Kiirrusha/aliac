import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import { Game } from "./Game/Game";
import { Home } from "./Home/Home";
import { AuthLayout } from "./Layout/AuthLayout";
import { Login } from "./Login/Login";
import { Room } from "./Room/Room";
import { RoomLayout } from "./Room/RoomLayout";
import { RoomSettings } from "./RoomSettings/RoomSettings";
import { WordKit } from "./WordKit/WordKit";

const roomRoutes = [
  {
    path: "/room/:roomId",
    element: <Room />,
  },
  {
    path: "/room/:roomId/settings",
    element: <RoomSettings />,
  },
  {
    path: "/room/:roomId/word-kit",
    element: <WordKit />,
  },
  {
    path: "/room/:roomId/game",
    element: <Game />,
  },
];

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
