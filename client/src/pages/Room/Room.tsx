import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import style from "./Room.module.scss";
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
    <div className={style.container}>
      <h2 className={style.header}>Команды</h2>
      <div className={style.teams}>
        {teams.map((team) => (
          <TeamComponent key={team.name} team={team} />
        ))}
      </div>
      <div className={style.spectatorsContainer}>
        <h2 className={style.header}>Наблюдатели</h2>
        <ul className={style.spectators}>
          {spectators.map((spectator) => (
            <li key={spectator.name} className={style.spectator}>
              {spectator.name}
            </li>
          ))}
        </ul>
      </div>
      <Link to={"/"}>
        <button>Покинуть комнату</button>
      </Link>
    </div>
  );
});
