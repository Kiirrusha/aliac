import { Avatar, Badge, Group, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { CustomButton } from "src/shared/ui/CustomButton";
import { CircleWithNumber } from "./RoomSettings.styled";

export const RoomSettings: FC = observer(() => {
  return (
    <Stack justify="space-between" align="center" w={"100%"} h={"100%"}>
      <Title order={2} ta={"center"} pt={"16px"}>
        Выбор команд
      </Title>
      <Group>
        <Badge
          style={{ fontSize: "%", fontWeight: "bold" }}
          w={"120px"}
          h={"120px"}
          circle
        >
          1
        </Badge>
        <Avatar size={130} c={"white"} style={{ backgroundColor: "violet" }}>
          2
        </Avatar>
        <CircleWithNumber number={"1"} backgroundColor={"green"} />
      </Group>
      <Stack w={"25%"} pb={"32px"}>
        <CustomButton variant="main">Продолжить</CustomButton>
      </Stack>
    </Stack>
  );
});
