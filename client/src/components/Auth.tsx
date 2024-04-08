import { Button, Group, Input, Paper, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { rootStore } from "src/stores/RootStore";

export const Auth: FC = observer(() => {
  const [input, setInput] = useState<string>("");

  const handleClose = () => {
    if (input.length <= 0) return;
    rootStore.userStore.setUser({ name: input });
  };

  return (
    <Paper bg={"red"} w={"fit-content"} p={"sm"}>
      <Stack gap={"xs"}>
        <Text>Выберите псевдоним</Text>
        <Group gap={"xs"}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleClose} disabled={!input.length}>
            Выбрать
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
});
