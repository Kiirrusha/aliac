import { Box, Paper, Text } from "@mantine/core";
import { FC } from "react";
import { Team } from "src/shared/types/general";

type TeamProps = {
  team: Team;
  isGuess: boolean;
};

export const TeamGame: FC<TeamProps> = ({ team, isGuess }) => {
  return (
    <Paper p={"md"}>
      <Box bg={isGuess ? "gold" : undefined}>{team.name}</Box>
      <Text>очки: {team.totalPoints}</Text>
    </Paper>
  );
};
