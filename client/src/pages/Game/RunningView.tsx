import React from "react";
import { StartingView } from "./StartingView";
import { Game } from "./Game";
import { rootStore } from "src/stores/RootStore";
import { DebugerButtons } from "./DebugerButtons";
import { PlayersView } from "./PlayersView";
import { LeaderView } from "./LeaderView";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

export const RunningView = observer(() => {
  const { isLeader } = rootStore.gameStore;

  if (isLeader) return <LeaderView />;

  return <PlayersView />;
});
