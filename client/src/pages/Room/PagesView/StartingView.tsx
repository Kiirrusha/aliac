import { Group, Paper, Stack } from "@mantine/core";
import React from "react";
import { CustomButton } from "src/shared/ui/CustomButton";

export const StartingView = () => {
  return (
    <Stack justify="center" w={"100%"} h={"100%"} align="center" pt={100}>
      <Paper w={592} h={331} bg={"#DE3E48"}></Paper>
      <CustomButton variant="main" px={280}>
        123
      </CustomButton>
    </Stack>
  );
};
