import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import { TeamComponent } from "./Team/TeamComponent";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { CustomButton } from "src/shared/ui/CustomButton";

const teamsColors = ["green", "violet", "orange", "blue"];

export const Room: FC = observer(() => {
  const room = rootStore.room;

  const { roomId } = useParams();

  useEffect(() => {
    if (!rootStore.room && roomId) rootStore.socketStore.joinRoom(roomId!);
  }, []);

  if (!room) return <p>loading...</p>;

  const { teams, spectators } = room;

  const spectatorsComponents = spectators.map((spectator) => (
    <Box key={spectator.name}>
      <Text c={"black"}>{spectator.name}</Text>
    </Box>
  ));
  return (
    <Stack h={"100%"}>
      <Title order={2} ta={"center"}>
        Команды
      </Title>
      <SimpleGrid cols={4}>
        {teams.map((team, i) => (
          <TeamComponent
            key={team.name}
            team={team}
            number={i + 1}
            backgroundColor={teamsColors[i]}
          />
        ))}
      </SimpleGrid>
      <Stack>
        <Title order={2} ta={"center"}>
          Наблюдатели
        </Title>
        <Group wrap="wrap">{spectatorsComponents}</Group>
        <Center>
          <CustomButton
            variant="main"
            onClick={() => rootStore.socketStore.moveTo("spectator")}
          >
            Переместиться в наблюдатели
          </CustomButton>
        </Center>
      </Stack>
      <Center mt={"auto"}>
        <CustomButton
          variant="main"
          onClick={() => rootStore.socketStore.leaveRoom()}
        >
          Покинуть комнату
        </CustomButton>
      </Center>
    </Stack>
  );
});
