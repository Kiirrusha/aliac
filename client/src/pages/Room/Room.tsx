import {
  Box,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { teamsColors } from "src/shared/constants/general";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import icon from "../../assets/svg/Icon.svg";
import { TeamComponent } from "./Team/TeamComponent";

export const Room: FC = observer(() => {
  const room = rootStore.room;
  const params = useParams();

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
      <Group align="center" w="100%">
        <Box flex={1} />
        <Box flex={2} style={{ display: "flex", justifyContent: "center" }}>
          <Title order={2} ta="center">
            Команды
          </Title>
        </Box>
        <Box flex={1} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={`/room/${params.roomId}/settings`}>
            <CustomButton variant="transparent" p={0}>
              <img key="icon" src={icon} alt="Icon" />
            </CustomButton>
          </Link>
        </Box>
      </Group>
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
