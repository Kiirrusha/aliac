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
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { teamsColors } from "src/shared/constants/general";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import icon from "../../assets/svg/Icon.svg";
import { TeamComponent } from "./Team/TeamComponent";

export const Room: FC = observer(() => {
  const {room, userStore} = rootStore;
  const params = useParams();
  const navigate = useNavigate();



  if (!room) throw new Error("комната не найдена");



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
         <Box flex={1} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
          {/* TODO заменит на admin name */}
          {room.name === userStore.user.name && <Link to={`/room/${params.roomId}/settings`} style={{ display: "flex", alignItems: "center" }}>
            <img src={icon} alt="" />
          </Link>}
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
          onClick={() => {
            rootStore.socketStore.leaveRoom();
            navigate("/");
          }}
        >
          Покинуть комнату
        </CustomButton>
      </Center>
    </Stack>
  );
});
