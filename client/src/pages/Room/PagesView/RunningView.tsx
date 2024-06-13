import { observer } from "mobx-react-lite";
import { rootStore } from "src/stores/RootStore";
import { LeaderView } from "./LeaderView";
import { PlayersView } from "./PlayersView";

export const RunningView = observer(() => {
  const { isLeader } = rootStore.gameStore;

  if (isLeader) return <LeaderView />;

  return <PlayersView />;
});
