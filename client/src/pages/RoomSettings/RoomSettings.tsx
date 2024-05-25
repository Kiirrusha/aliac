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
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import exit from "./../../assets/svg/exit.svg";
import { RoomSettingTeams } from "./RoomSettingTeams";
import { CircleAddTeam, CircleWithNumber } from "./RoomSettings.styled";
import { teamsColors } from "src/shared/constants/general";

export const RoomSettings: FC = observer(() => {
  const room = rootStore.room;

  if (!room) throw new Error("не найдена комната");
  const params = useParams();
  // const [teamNames, setTeamNames] = useState(
  //   room.teams.map((team) => {
  //     return team.name;
  //   })
  // );

  // const changeTeamName = (index: number, newName: string) => {
  //   setTeamNames(
  //     teamNames.map((name, i) => {
  //       if (i === index) return newName;
  //       return name;
  //     })
  //   );
  // };
  const controller = useLocalObservable(() => ({
    roundTimeCollection: ["30", "60", "90"],
    pointsToWinCollection: ["10", "25", "50", "75", "100"],
    reducePoints: room.reducePoints,
    currentRoundTime: room.roundTime.toString(),
    currentPointsToWin: room.pointsToWin?.toString() || "50",
    teamNames: room?.teams.map((team) => {
      return team.name;
    }),
    teamOne: room?.teams?.[0].name,
    teamTwo: room?.teams?.[1].name,
    teamThree: room?.teams?.[2]?.name,
    teamFour: room?.teams?.[3]?.name,
    deleteTeam() {
      this.teamNames.pop();
      console.log(this.teamNames);
    },
    addTeam() {
      this.teamNames = [...this.teamNames, `Team ${this.teamNames.length + 1}`];
    },
  }));

  const onSaveRoomSettingsClick = () => {
    rootStore.socketStore.saveRoomSettings({
      pointsToWin: controller.currentPointsToWin,
      roundTime: controller.currentRoundTime,
      reducePoints: controller.reducePoints,
      teamNames: [
        controller.teamOne,
        controller.teamTwo,
        controller.teamThree,
        controller.teamFour,
      ],
    });
  };

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
          <Stack align="center" gap={"xs"}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[0]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={controller.teamOne}
              onChange={(event) => {
                controller.teamOne = event.target.value;
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"}>
            <CircleWithNumber
              number={2}
              backgroundColor={teamsColors[1]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={controller.teamTwo}
              onChange={(event) => {
                controller.teamTwo = event.target.value;
              }}
            />
          </Stack>
          {controller.teamThree && (
            <Stack align="center" gap={"xs"} key={controller.teamNames[2]}>
              <CircleWithNumber
                number={3}
                backgroundColor={teamsColors[2]}
                hasCloseButton={false}
              />
              <Input
                w={"120px"}
                value={controller.teamThree}
                onChange={(event) => {
                  controller.teamThree = event.target.value;
                }}
              />
            </Stack>
          )}
          {controller.teamFour && (
            <Stack align="center" gap={"xs"} key={controller.teamNames[3]}>
              <CircleWithNumber
                number={4}
                backgroundColor={teamsColors[3]}
                hasCloseButton={false}
              />
              <Input
                w={"120px"}
                value={controller.teamFour}
                onChange={(event) => {
                  controller.teamFour = event.target.value;
                }}
              />
            </Stack>
          )}
          {/* {controller.teamNames.length < 4 && (
            <Stack align="center" gap={0}>
              <CircleAddTeam onClick={controller.addTeam} />
            </Stack>
          )} */}
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
