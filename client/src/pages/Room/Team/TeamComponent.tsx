import { Team } from "../../../../../shared/types";
import { rootStore } from "src/stores/RootStore";
import { observer } from "mobx-react-lite";
import { Avatar, Center, Paper, Stack, Text, Title } from "@mantine/core";
import { CircleWithNumber } from "src/pages/RoomSettings/RoomSettings.styled";
import avatar from "./Avatar.svg";
interface Props {
  team: Team;
  number: number;
  backgroundColor: string;
}

export const TeamComponent = observer(
  ({ team, number, backgroundColor }: Props) => {
    const { players, name } = team;
    const mockPlayers = new Array(5).fill(null).map((_, i) => players[i]);

    const playersComponents = mockPlayers.map((player, i) => {
      if (player) {
        return (
          <Paper
            key={player.name}
            bg={"red"}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <Avatar
              style={{ position: "absolute", top: "-6px", left: 0 }}
              src={avatar}
            />
            <Center>
              <Text>{player.name}</Text>
            </Center>
          </Paper>
        );
      }

      return (
        <Paper
          key={i}
          bg={"red"}
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => rootStore.socketStore.moveTo("team", name)}
        >
          <Center>
            <Text c={"white"}>Занять слот</Text>
          </Center>
        </Paper>
      );
    });

    return (
      <Stack>
        <Stack align={"center"} gap={0}>
          <CircleWithNumber
            number={number}
            backgroundColor={backgroundColor}
            hasCloseButton={false}
          />
          <Title order={3}>{name}</Title>
        </Stack>
        <Stack gap={"md"}>{playersComponents}</Stack>
      </Stack>
    );
  }
);
