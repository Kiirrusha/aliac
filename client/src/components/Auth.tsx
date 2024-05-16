import { Grid, GridCol, Input, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { CustomButton } from "src/shared/ui/CustomButton";
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
      <Text fw={600} c={"white"} size="lg">
        Выберите псевдоним
      </Text>
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
          <CustomButton
            variant="main"
            onClick={handleClose}
            disabled={!input.length}
            fullWidth
          >
            Выбрать
          </CustomButton>
        </GridCol>
      </Grid>
    </Stack>
  );
});
