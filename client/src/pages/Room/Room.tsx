import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import style from "./Room.module.scss";
import { toJS } from "mobx";

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
  console.log(toJS(rootStore.room));
  return (
    <div className={style.container}>
      <h2 className={style.header}>Команды</h2>
      <div className={style.teams}>
        {teams.map((team) => (
          <div className={style.team}>
            <h3>{team.name}</h3>
            <ul key={team.name} className={style.players}>
              {team.players.map((player) => (
                <li key={player.name} className={style.player}>
                  {player.name}
                </li>
              ))}
            </ul>
            <hr></hr>
            <div className={style.captain}>{team.leader.name}</div>
          </div>
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
