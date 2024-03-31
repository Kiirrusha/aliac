import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Layout: FC = observer(() => {
  if (!rootStore.rooms) return <p>loading...</p>;
  return (
    <div>
      <h1>Alias Game Online</h1>
      <Outlet />
    </div>
  );
});
