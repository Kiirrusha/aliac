import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { rootStore } from "src/stores/RootStore";
import { DebugerButtons } from "./DebugerButtons";
import { StartingView } from "./StartingView";
import { RunningView } from "./RunningView";
import { EndingView } from "./EndingView";
import { Navigate } from "react-router-dom";
import { GAME_STATE, GAME_STATE_VALUE } from "src/shared/types/general";

const pageByGameState = {
  starting: <StartingView />,
  running: <RunningView />,
  waiting: <RunningView />,
  ending: <EndingView />,
};

export const Game = observer(() => {
  const { gameState } = rootStore.gameStore;

  useEffect(() => {
    const dispose = rootStore.gameStore.startCountdown();
    return dispose;
  }, []);

  if (gameState === null) return <Navigate to={`/`} />;

  if (gameState === "preparing") return <Navigate to={`/room/${rootStore.room?.id}`} />;

  return (
    <>
      {pageByGameState[gameState]}
      {/* <DebugerButtons /> */}
    </>
  );
});
