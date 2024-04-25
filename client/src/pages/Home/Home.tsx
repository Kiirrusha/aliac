import { Button, Group, List, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Home: FC = observer(() => {
  if (!rootStore.userStore.user?.name) return <Navigate to={`/login`} />;

  return (
    <Stack justify="space-between" align="center" w={"100%"} h={"100%"}>
      <Title order={2} ta={"center"} pt={"16px"}>
        Доступные комнаты
      </Title>
      <List
        listStyleType="none"
        px={21}
        w={"100%"}
        style={{
          display: "flex",
          gap: 16,
          flexDirection: "column",
        }}
      >
        {rootStore.rooms.map((room) => (
          <Group
            key={room.id}
            align="center"
            justify="space-between"
            bg={"#EC6D75"}
            px={40}
            style={{
              borderRadius: "28px",
            }}
          >
            <List listStyleType="none">{room.id}</List>
            <Link to={`/room/${room.id}`}>
              <Button>Подключиться</Button>
            </Link>
          </Group>
        ))}
      </List>
      <Stack w={"25%"} pb={"32px"}>
        <Button onClick={rootStore.addRoom}>Создать комнату</Button>
      </Stack>
    </Stack>
  );
});
