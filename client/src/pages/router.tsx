import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import { Home } from "./Home/Home";
import { AuthLayout } from "./Layout/AuthLayout";
import { Login } from "./Login/Login";
import { DistributorRoomView } from "./Room/DistributorRoomView";
import { RoomLayout } from "./Room/RoomLayout";
import { RoomSettings } from "./RoomSettings/RoomSettings";
import { WordKit } from "./WordKit/WordKit";
import { Rules } from "./Rules/Rules";

const roomRoutes = [
  {
    path: "/room/:roomId",
    element: <DistributorRoomView />,
  },
  {
    path: "/room/:roomId/settings",
    element: <RoomSettings />,
  },
  {
    path: "/room/:roomId/word-kit",
    element: <WordKit />,
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
            path: "/rules",
            element: <Rules />,
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
