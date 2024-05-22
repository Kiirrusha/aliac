import {
  Box,
  Group,
  Input,
  SegmentedControl,
  Stack,
  Switch,
  Title,
} from "@mantine/core";
import { observer, useLocalObservable } from "mobx-react-lite";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { teamsColors } from "src/shared/constants/general";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import exit from "./../../assets/svg/exit.svg";
import { CircleAddTeam, CircleWithNumber } from "./RoomSettings.styled";

export const RoomSettings: FC = observer(() => {
  const room = rootStore.room;
  if (!room) throw new Error("не найдена комната");
  const params = useParams();
  const controller = useLocalObservable(() => ({
    roundTimeCollection: ["30", "60", "90"],
    pointsToWinCollection: ["10", "25", "50", "75", "100"],
    reducePoints: true,
    currentRoundTime: "60",
    currentPointsToWin: "50",
    teamNames: room?.teams.map((team) => {
      return team.name;
    }),
    deleteTeam() {
      this.teamNames.pop();
      console.log(this.teamNames);
    },
    addTeam() {
      this.teamNames = [...this.teamNames, `Team ${this.teamNames.length + 1}`];
    },
    changeTeamName(index: number, newName: string) {
      this.teamNames = this.teamNames.map((name, i) => {
        if (i === index) return newName;
        return name;
      });
    },
  }));

  const onSaveRoomSettingsClick = () => {
    rootStore.socketStore.saveRoomSettings({
      pointsToWin: controller.currentPointsToWin,
      roundTime: controller.currentRoundTime,
      reducePoints: controller.reducePoints,
      teamNames: controller.teamNames,
    });
  };

  // const teamsComponents = useMemo(() => {
  //   return , [controller.teamNames]);

  return (
    <>
      <Stack justify="space-between" w={"100%"} h={"100%"}>
        <Group>
          <Box flex={1} />
          <Box flex={2} style={{ display: "flex", justifyContent: "center" }}>
            <Title order={2} ta={"center"}>
              Выбор команд
            </Title>
          </Box>
          <Box flex={1} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={`/room/${params.roomId}`}>
              <CustomButton variant="transparent" p={0}>
                <img key="icon" width={36} height={36} src={exit} alt="Icon" />
              </CustomButton>
            </Link>
          </Box>
        </Group>
        <Group align="start">
          {controller.teamNames.map((teamName, i) => (
            <Stack align="center" gap={"xs"} key={teamName}>
              <CircleWithNumber
                number={i + 1}
                backgroundColor={teamsColors[i]}
                hasCloseButton={
                  controller.teamNames.length >= 3 &&
                  i === controller.teamNames.length - 1
                }
                onClick={controller.deleteTeam}
              />
              <Input
                w={"120px"}
                value={teamName}
                onChange={(event) => {
                  controller.changeTeamName(i, event.target.value);
                }}
              />
            </Stack>
          ))}
          {controller.teamNames.length < 4 && (
            <Stack align="center" gap={0}>
              <CircleAddTeam onClick={controller.addTeam} />
            </Stack>
          )}
        </Group>
        <Stack w={"100%"}>
          <Title order={3}>Длительность раунда (c)</Title>
          <SegmentedControl
            data={controller.roundTimeCollection}
            value={controller.currentRoundTime}
            onChange={(value) => {
              controller.currentRoundTime = value;
            }}
          />
        </Stack>
        <Stack w={"100%"}>
          <Title order={3}>Очки для победы</Title>
          <SegmentedControl
            data={controller.pointsToWinCollection}
            value={controller.currentPointsToWin}
            onChange={(value) => {
              controller.currentPointsToWin = value;
            }}
          />
        </Stack>
        <Switch
          labelPosition="left"
          label={<Title order={3}>Отнимать очки за пропуск</Title>}
          size="xl"
          w={"fit-content"}
          styles={{ track: { cursor: "pointer" } }}
          checked={controller.reducePoints}
          onChange={(event) => {
            controller.reducePoints = event.target.checked;
          }}
        />
        <Stack align="start">
          <Link to={`/room/${params.roomId}/word-kit`}>
            <CustomButton variant="main">Выбрать набор слов</CustomButton>
          </Link>
        </Stack>
        <Stack pb={"32px"} align="center">
          <CustomButton variant="main" onClick={onSaveRoomSettingsClick}>
            Сохранить
          </CustomButton>
        </Stack>
      </Stack>
    </>
  );
});
