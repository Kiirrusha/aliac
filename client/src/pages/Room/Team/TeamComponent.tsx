import { Team } from "../../../../../shared/types";
import { rootStore } from "src/stores/RootStore";
import { observer } from "mobx-react-lite";

interface Props {
  team: Team;
}

export const TeamComponent = observer(({ team }: Props) => {
  const { players, leader, name } = team;
  return (
    <div>
      <h3>{name}</h3>
      <ul key={name}>
        {players.map((player) => (
          <li key={player.name}>{player.name}</li>
        ))}
        {players.length < 5 && (
          <button
            onClick={() => {
              rootStore.moveToPlayer(name);
            }}
          >
            Занять слот
          </button>
        )}
      </ul>

      <hr></hr>
      {leader ? <div>{leader.name}</div> : <button>Слот лидера</button>}
    </div>
  );
});
