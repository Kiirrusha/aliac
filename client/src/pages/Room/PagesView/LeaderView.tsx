import { useGSAP } from "@gsap/react";
import {
  Button,
  Center,
  Group,
  Paper,
  RingProgress,
  Stack,
  Text,
} from "@mantine/core";
import gsap from "gsap";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { rootStore } from "src/stores/RootStore";

export const LeaderView = observer(() => {
  const { roundTime } = rootStore.room!;
  const { countdown, words, onNoClick, onYesClick } = rootStore.gameStore;
  const percent = (countdown * 100) / roundTime;
  // const isTeamGuess = false;
  const [isDisabled, setIsDisabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const handleAnimatedYesClick = contextSafe(() => {
    gsap
      .timeline()
      .call(() => {
        setIsDisabled(true);
      })
      .to(ref.current, {
        x: -100,
        opacity: 0,
      })
      .call(onYesClick)
      .set(ref.current, {
        x: 0,
      })
      .call(() => {
        setIsDisabled(false);
      })
      .to(ref.current, {
        opacity: 1,
      });
  });

  const handleAnimatedNoClick = contextSafe(() => {
    gsap
      .timeline()
      .call(() => {
        setIsDisabled(true);
      })
      .to(ref.current, {
        x: 100,
        opacity: 0,
      })
      .call(onNoClick)
      .set(ref.current, {
        x: 0,
      })
      .call(() => {
        setIsDisabled(false);
      })
      .to(ref.current, {
        opacity: 1,
      });
  });

  return (
    <Center>
      <Stack>
        <RingProgress
          sections={[{ value: percent, color: "blue" }]}
          size={150}
          thickness={20}
          label={
            <Text c="blue" fw={700} ta="center" size="xl">
              {countdown}
            </Text>
          }
        />
        <Paper ref={ref}>
          <Text>{words.at(-1)}</Text>
        </Paper>
        <Group justify="space-between">
          <Button disabled={isDisabled} onClick={handleAnimatedYesClick}>
            Да
          </Button>
          <Button disabled={isDisabled} onClick={handleAnimatedNoClick}>
            нет
          </Button>
        </Group>
      </Stack>
    </Center>
  );
});
