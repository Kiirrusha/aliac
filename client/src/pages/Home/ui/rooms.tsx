import { Button, Group, List } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Roomss: FC = observer(() => {
  return (
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
  );
});
