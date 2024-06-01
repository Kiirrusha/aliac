import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { rootStore } from "src/stores/RootStore";
import { DebugerButtons } from "./DebugerButtons";
import { StartingView } from "./StartingView";
import { RunningView } from "./RunningView";
import { EndingView } from "./EndingView";

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

  return (
    <>
      {pageByGameState[gameState]}
      <DebugerButtons />
    </>
  );
});
