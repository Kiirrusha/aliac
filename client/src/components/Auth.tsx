import {
  Button,
  Grid,
  GridCol,
  Group,
  Input,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { COLORS } from "src/const/color";
import { rootStore } from "src/stores/RootStore";

export const Auth: FC = observer(() => {
  const [input, setInput] = useState<string>("");

  const handleClose = () => {
    if (input.length <= 0) return;
    rootStore.userStore.setUser({ name: input });
  };
  // не убирается margin left у Group
  return (
    <Stack gap={"xs"}>
      <Text>Выберите псевдоним</Text>
      <Grid gutter={"xs"} w={"100%"}>
        <GridCol span={8}>
          <Input
            type="text"
            value={input}
            style={{}}
            onChange={(e) => setInput(e.target.value)}
          />
        </GridCol>
        <GridCol span={4}>
          <Button onClick={handleClose} disabled={!input.length} fullWidth>
            Выбрать
          </Button>
        </GridCol>
      </Grid>
    </Stack>
  );
});
