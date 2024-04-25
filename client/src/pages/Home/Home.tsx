import { Button, Group, List, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import { Roomss } from "./ui/rooms";
import { addRoom } from "./lib/addRoom";

export const Home: FC = observer(() => {
  if (!rootStore.userStore.user?.name) return <Navigate to={`/login`} />;

  return (
    <Stack justify="space-between" align="center" w={"100%"} h={"100%"}>
      <Title order={2} ta={"center"} pt={"16px"}>
        Доступные комнаты
      </Title>
      <Roomss />
      <Stack w={"25%"} pb={"32px"}>
        <Button onClick={addRoom}>Создать комнату</Button>
      </Stack>
    </Stack>
  );
});
