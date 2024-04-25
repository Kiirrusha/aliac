import { Paper } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { COLORS } from "src/const/color";

export const WithPaper = () => {
  return (
    <Paper bg={COLORS.bg} h={"85vh"}>
      <Outlet />
    </Paper>
  );
};
