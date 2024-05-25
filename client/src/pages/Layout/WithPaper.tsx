import { Paper, ScrollArea } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { COLORS } from "src/const/color";

export const WithPaper = () => {
  return (
    <Paper bg={COLORS.bg} h={"85vh"} px={"md"}>
      <ScrollArea h={"100%"} type="never">
        <Outlet />
      </ScrollArea>
    </Paper>
  );
};
