import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Room: FC = observer(() => {
  const room = rootStore.room;

  const { roomId } = useParams();
  useEffect(() => {
    if (!roomId) return;
    rootStore.joinRoom(roomId);

    return () => {
      rootStore.leaveRoom();
    };
  }, []);

  if (!room) return <p>loading...</p>;

  return (
    <div>
      <div>
        <h3>spectators</h3>
        <ul>
          {room.spectators.map((spectator) => (
            <li key={spectator.name}>{spectator.name}</li>
          ))}
        </ul>
      </div>
      <Link to={"/"}>
        <button>Покинуть комнату</button>
      </Link>
    </div>
  );
});
