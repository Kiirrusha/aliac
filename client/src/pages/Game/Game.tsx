import { List, ListItem, RingProgress, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { rootStore } from "src/stores/RootStore";
import { TeamGame } from "./TeamGame";
import { PlayersView } from "./PlayersView";

export const Game = observer(() => {
  const isLeader = true;
  useEffect(() => {
    const dispose = rootStore.gameStore.startCountdown();

    return dispose;
  }, []);
  //   if (isLeader) return (
  //     <LeaderView />
  //   )

  return (
    <>
      <PlayersView />
    </>
  );
});
