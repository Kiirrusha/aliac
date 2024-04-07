import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import { TeamComponent } from "./Team/TeamComponent";

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

  const { teams, spectators } = room;
  return (
    <div>
      <h2>Команды</h2>
      <div>
        {teams.map((team) => (
          <TeamComponent key={team.name} team={team} />
        ))}
      </div>
      <div>
        <h2>Наблюдатели</h2>
        <ul>
          {spectators.map((spectator) => (
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
