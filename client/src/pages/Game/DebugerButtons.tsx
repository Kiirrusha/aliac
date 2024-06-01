import { Box, Button, Group, Stack } from "@mantine/core";
import { rootStore } from "src/stores/RootStore";

export const DebugerButtons = () => {
  const { debugerClick } = rootStore.gameStore;
  return (
    <Stack pos={"absolute"} top={80} right={0}>
      <Button onClick={() => debugerClick("gameState")}>gameState</Button>
      <Button onClick={() => debugerClick("isLeader")}>isLeader</Button>
      <Button onClick={() => debugerClick("isTeamGuess")}>isTeamGuess</Button>
    </Stack>
  );
};
