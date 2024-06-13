import { Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { images } from "./image";

export const Rules = () => {
  return (
    <>
      <Stack align="center" gap={"xl"}>
        <Title>Правила</Title>
        <Group h={"100%"}>
          <Text flex={1} size="xl" fw={600} lh={"25px"}>
            {/* <p>Перед игрой разбейтесь на команды.</p>
            <p>
              Задача игрока - объяснять появляющиеся на экране слова своей
              команде.
            </p>
            <p>
              Задача остальных игроков - отгадать как можно больше слов в
              течение заданного времени.
            </p> */}
          </Text>
          <Image flex={1} src={images.image1} fit="contain" />
        </Group>
        <Group h={"100%"}>
          <Image flex={1} src={images.image2} fit="contain" />
          <Text flex={1} size="xl" fw={600} lh={"25px"}>
            {/* <p>
              Если слово было отгадано, нажмите кнопку “Да”, если нет - нажмите
              кнопку “Нет”.
            </p>
            <p>
              По истечении времени у команды есть возможность отгадать последнее
              слово.
            </p> */}
          </Text>
        </Group>
        <Group h={"100%"}>
          <Text flex={1} size="xl" fw={600} lh={"25px"}>
            {/* <p>
              При объяснении не используйте однокоренные слова и переводы на
              другие языки. Нельзя указывать на предметы или объяснять их по
              буквам.
            </p>
            <p>
              Игра длится до тех пор, пока одна из команд не наберёт заданное
              количество очков.
            </p> */}
          </Text>
          <Image flex={1} src={images.image3} fit="contain" />
        </Group>
        <Title mb={30}>Особенности игры</Title>
        <Group align="center" justify="space-around" w={"100%"} mb={120}>
          <Stack align="center">
            <Image
              src={images.image4}
              w={"10em"}
              h={"10em"}
              style={{ flex: "initial", objectFit: "unset" }}
            />
            <Text size="xl" fw={600}>
              От 4 до 20 игроков
            </Text>
          </Stack>
          <Stack align="center">
            <Image
              src={images.image5}
              w={"10em"}
              h={"10em"}
              style={{ flex: "initial", objectFit: "unset" }}
            />
            <Text size="xl" fw={600}>
              Длительности игры: от 15 минут
            </Text>
          </Stack>
          <Stack align="center">
            <Image
              src={images.image6}
              w={"10em"}
              h={"10em"}
              style={{ flex: "initial", objectFit: "unset" }}
            />
            <Text size="xl" fw={600}>
              12 тематических наборов
            </Text>
          </Stack>
        </Group>
        <Stack
          w={"100vw"}
          h={100}
          align="center"
          justify="center"
          bg={"red"}
          mb={-16}
        >
          <Text size="xl" fw={600} c={"white"}>
            2024 | alias.game-online.ru
          </Text>
        </Stack>
      </Stack>
    </>
  );
};
