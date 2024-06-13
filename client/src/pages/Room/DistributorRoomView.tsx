import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { rootStore } from "src/stores/RootStore";

import { Navigate } from "react-router-dom";
import { StartingView } from "./PagesView/StartingView";
import { RunningView } from "./PagesView/RunningView";
import { EndingView } from "./PagesView/EndingView";
import { Room } from "./Room";

const pageByGameState = {
  preparing: <Room />,
  starting: <StartingView />,
  waiting: <RunningView />,
  running: <RunningView />,
  ending: <EndingView />,
  gameover: <EndingView />,
};

export const DistributorRoomView = observer(() => {
  const { gameState } = rootStore.gameStore;
  if (gameState === null) return <Navigate to={`/`} />;

  useEffect(() => {
    const dispose = rootStore.gameStore.startCountdown();
    return dispose;
  }, []);

  return (
    <>
      {pageByGameState[gameState]}
      {/* <DebugerButtons /> */}
    </>
  );
});
