import { Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import { Rooms } from "./ui/rooms";

export const Home: FC = observer(() => {
  if (!rootStore.userStore.user?.name) return <Navigate to={`/login`} />;

  return (
    <Stack justify="space-between" align="center" w={"100%"} h={"100%"}>
      <Title order={2} ta={"center"} pt={"16px"}>
        Доступные комнаты
      </Title>
      <Rooms />
      <Stack pb={"24px"}>
        <CustomButton variant="main" onClick={rootStore.addRoom}>
          Создать комнату
        </CustomButton>
      </Stack>
    </Stack>
  );
});
