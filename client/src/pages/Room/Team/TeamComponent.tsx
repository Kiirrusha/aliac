import { toJS } from "mobx";
import { Team } from "../../../../../shared/types";
import style from "../Room.module.scss";
import { rootStore } from "src/stores/RootStore";
import { observer } from "mobx-react-lite";

interface Props {
  team: Team;
}

export const TeamComponent = observer(({ team }: Props) => {
  const { players, leader, name } = team;
  console.log(toJS(players.length));
  return (
    <div className={style.team}>
      <h3>{name}</h3>
      <ul key={name} className={style.players}>
        {players.map((player) => (
          <li key={player.name} className={style.player}>
            {player.name}
          </li>
        ))}
        {players.length < 5 && (
          <button
            className={style.buttonPlayer}
            onClick={() => {
              rootStore.moveToPlayer(name);
            }}
          >
            Занять слот
          </button>
        )}
      </ul>

      <hr></hr>
      {leader ? (
        <div className={style.captain}>{leader.name}</div>
      ) : (
        <button className={style.button}>Слот лидера</button>
      )}
    </div>
  );
});
