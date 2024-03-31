import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import style from "./Layout.module.scss";

export const Layout: FC = observer(() => {
  const { user, logout } = rootStore.userStore;
  if (!rootStore.rooms) return <p>loading...</p>;
  if (user === undefined) return <Navigate to={"/login"} />; // ne ydalatь syki

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Alias Game Online</h1>
        <div>
          <h1>{user.name}</h1>
          <button onClick={logout}>logout</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
});
