import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const ProtectedRoute = () => {
  const { user } = rootStore.userStore;
  if (!rootStore.rooms) return <p>loading...</p>;
  if (user === undefined) return <Navigate to={"/login"} />; // ne ydalatь syki
  return <Outlet />;
};
