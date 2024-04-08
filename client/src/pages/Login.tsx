import { Group, Stack } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "src/components/Auth";
import { Logo } from "src/components/Logo";
import { PeoplesImg } from "src/components/PeoplesImg";
import { rootStore } from "src/stores/RootStore";

export const Login: FC = observer(() => {
  const user_name = rootStore.userStore.user?.name;
  if (user_name) return <Navigate to={`/`} />;

  return (
    <Stack align="center">
      <Stack align="center">
        <Logo size={"large"} />
        <PeoplesImg />
        <Auth />
      </Stack>
    </Stack>
  );
});
