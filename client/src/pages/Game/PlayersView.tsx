import { Group, Paper, RingProgress, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { rootStore } from "src/stores/RootStore";
import { TeamGame } from "./TeamGame";

export const PlayersView = observer(() => {
  const { teams, roundTime } = rootStore.room!;
  const { countdown, gameState, isTeamGuess } = rootStore.gameStore;
  const percent = (countdown * 100) / roundTime;

  return (
    <>
      <Group>
        {teams.map((team) => {
          return <TeamGame key={team.id} team={team} isGuess={false} />;
        })}
      </Group>
      <Group justify="center">
        <Paper shadow="xs" radius="xl" withBorder p="xl">
          {gameState === "running" && isTeamGuess && (
            <Text>Ваша команда отгадывает, отгадывайте!</Text>
          )}
          {gameState === "waiting" && isTeamGuess && (
            <Text>ожидание ВАШЕГО ЛИДЕРА!!!, ...</Text>
          )}
          {gameState === "running" && !isTeamGuess && (
            <Text>отгадывает команда,TODO: название команды </Text>
          )}
          {gameState === "waiting" && !isTeamGuess && (
            <Text>ожидание TODO: команды такой то</Text>
          )}
        </Paper>
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
      </Group>
    </>
  );
});
