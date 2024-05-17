import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import { TeamComponent } from "./Team/TeamComponent";

export const Room: FC = observer(() => {
  const room = rootStore.room;

  const { roomId } = useParams();

  useEffect(() => {
    if (!rootStore.room && roomId) rootStore.socketStore.joinRoom(roomId!);
    
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
          <button onClick={() => rootStore.socketStore.moveTo("spectator")}>Переместиться в наблюдатели</button>
        </ul>
      </div>
        <button onClick={() => rootStore.socketStore.leaveRoom()}>Покинуть комнату</button>
    </div>
  );
});
