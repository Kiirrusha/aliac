import {
  Box,
  Button,
  Center,
  Group,
  Indicator,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WordKits } from "src/shared/types/general";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import exit from "../../assets/svg/exit.svg";

const mockWordKits: WordKits = [
  {
    selected: true,
    name: "test",
    image: "https://loremflickr.com/640/480/animals",
  },
  {
    selected: false,
    name: "test2",
    image: "https://loremflickr.com/640/480/animals",
  },
  {
    selected: true,
    name: "test3",
    image: "https://loremflickr.com/640/480/animals",
  },
  {
    selected: false,
    name: "test4",
    image: "https://loremflickr.com/640/480/animals",
  },
  {
    selected: false,
    name: "test5",
    image: "https://loremflickr.com/640/480/animals",
  },
];

export const WordKit: FC = () => {
  const [wordKit, setWordKit] = useState<WordKits>(mockWordKits);
  const navigate = useNavigate();
  const params = useParams();

  const onWordKitClick = (name: string) => {
    setWordKit(
      wordKit.map((wordKit) => {
        if (wordKit.name === name) {
          return { ...wordKit, selected: !wordKit.selected };
        } else {
          return wordKit;
        }
      })
    );
  };

  const onSaveClick = async () => {
    await rootStore.socketStore.saveWordKit(wordKit);
    navigate(`/room/${params.roomId}`);
  };

  const kits = wordKit.map((wordKit) => (
    <Indicator
      key={wordKit.name}
      size={30}
      color="red"
      disabled={!wordKit.selected}
      offset={3}
      label={"✓"}
    >
      <Paper
        w={"200px"}
        h={"150px"}
        style={{
          backgroundImage: `url(${wordKit.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
        onClick={() => onWordKitClick(wordKit.name)}
      >
        <Center h={"100%"}>
          <Paper px={"sm"} py={3}>
            <Title c={"black"} order={3} style={{ userSelect: "none" }}>
              {wordKit.name.toLocaleUpperCase()}
            </Title>
          </Paper>
        </Center>
      </Paper>
    </Indicator>
  ));

  return (
    <Stack h={"100%"} align="center">
      <Group w={"100%"}>
        <Box flex={1} />
        <Box flex={2} style={{ display: "flex", justifyContent: "center" }}>
          <Title order={2} ta={"center"}>
            Выбор набора
          </Title>
        </Box>
        <Box flex={1} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={`/room/${params.roomId}/settings`}>
            <CustomButton variant="transparent" p={0}>
              <img key="icon" width={36} height={36} src={exit} alt="Icon" />
            </CustomButton>
          </Link>
        </Box>
      </Group>
      <Center pt={"sm"}>
        <SimpleGrid cols={4}>{kits}</SimpleGrid>
      </Center>
      <Button mt={"auto"} mb={"xs"} px={"xl"} bg={"red"} onClick={onSaveClick}>
        Сохранить и выйти
      </Button>
    </Stack>
  );
};
