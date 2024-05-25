import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const RoomLayout = observer(() => {
  const room = rootStore.room;

  const { roomId } = useParams();

  useEffect(() => {
    console.log(room);
    if (!room && roomId) rootStore.socketStore.joinRoom(roomId!);
  }, []);

  if (!room) return <p>loading...</p>;

  return <Outlet />;
});
