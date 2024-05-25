import { Input, Stack } from "@mantine/core";
import { FC } from "react";
import { teamsColors } from "src/shared/constants/general";
import { CircleWithNumber } from "./RoomSettings.styled";

type RoomSettingTeamsProps = {
  amountTeams: number;
  teamNames: string[];
  onClick: () => void;
  onChange: (i: number, newName: string) => void;
};

export const RoomSettingTeams: FC<RoomSettingTeamsProps> = (props) => {
  const { amountTeams, teamNames, onChange, onClick } = props;

  return (
    <>
      {amountTeams === 2 && (
        <>
          <Stack align="center" gap={"xs"} key={teamNames[0]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[0]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[0]}
              onChange={(event) => {
                onChange(0, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[1]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[1]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[1]}
              onChange={(event) => {
                onChange(1, event.target.value);
              }}
            />
          </Stack>
        </>
      )}
      {amountTeams === 3 && (
        <>
          <Stack align="center" gap={"xs"} key={teamNames[0]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[0]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[0]}
              onChange={(event) => {
                onChange(0, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[1]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[1]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[1]}
              onChange={(event) => {
                onChange(1, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[2]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[2]}
              hasCloseButton={true}
              onClick={onClick}
            />
            <Input
              w={"120px"}
              value={teamNames[2]}
              onChange={(event) => {
                onChange(2, event.target.value);
              }}
            />
          </Stack>
        </>
      )}
      {amountTeams === 4 && (
        <>
          <Stack align="center" gap={"xs"} key={teamNames[0]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[0]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[0]}
              onChange={(event) => {
                onChange(0, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[1]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[1]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[1]}
              onChange={(event) => {
                onChange(1, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[2]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[2]}
              hasCloseButton={false}
            />
            <Input
              w={"120px"}
              value={teamNames[2]}
              onChange={(event) => {
                onChange(2, event.target.value);
              }}
            />
          </Stack>
          <Stack align="center" gap={"xs"} key={teamNames[3]}>
            <CircleWithNumber
              number={1}
              backgroundColor={teamsColors[3]}
              hasCloseButton={true}
              onClick={onClick}
            />
            <Input
              w={"120px"}
              value={teamNames[3]}
              onChange={(event) => {
                onChange(3, event.target.value);
              }}
            />
          </Stack>
        </>
      )}
    </>
  );
};
