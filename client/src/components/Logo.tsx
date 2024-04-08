import { Group, Stack, Text, Title } from "@mantine/core";
import React, { FC } from "react";

interface Props {
  size: "small" | "large";
}

export const Logo: FC<Props> = ({ size }) => {
  const sizes = {
    title: size === "large" ? 80 : 30,
    text: size === "large" ? 35 : 15,
  };

  return (
    <Stack align="center" gap={0}>
      <Title fz={sizes.title} style={{ lineHeight: 0.6 }} c={"red"}>
        Alias
      </Title>
      <Text fz={sizes.text}>Game Online</Text>
    </Stack>
  );
};
