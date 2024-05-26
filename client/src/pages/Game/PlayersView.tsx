import { List, ListItem, RingProgress, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { rootStore } from "src/stores/RootStore";
import { TeamGame } from "./TeamGame";

export const PlayersView = observer(() => {
  const { teams, roundTime } = rootStore.room!;
  const { countdown, gameState } = rootStore.gameStore;
  const percent = (countdown * 100) / roundTime;
  const isTeamGuess = false;

  return (
    <>
      <List>
        {teams.map((team) => {
          return (
            <ListItem key={team.id}>
              <TeamGame team={team} isGuess={false} />
            </ListItem>
          );
        })}
      </List>
      <RingProgress
        sections={[{ value: percent, color: "blue" }]}
        size={150}
        thickness={20}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            {countdown}
          </Text>
        }
      />
      {gameState === "starting" && isTeamGuess && (
        <Text>Ваша команда отгадывает, ...</Text>
      )}
      {gameState === "waiting" && isTeamGuess && (
        <Text>ожидание ВАШЕГО ЛИДЕРА!!!, ...</Text>
      )}
      {gameState === "starting" && !isTeamGuess && (
        <Text>отгадывает команда,TODO: название команды </Text>
      )}
      {gameState === "waiting" && !isTeamGuess && (
        <Text>ожидание TODO: команды такой то</Text>
      )}
    </>
  );
});
