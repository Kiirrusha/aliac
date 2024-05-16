import { AppShell, Container, Group, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";

export const AuthLayout: FC = observer(() => {
  const { user, logout } = rootStore.userStore;

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size={"lg"}>
          <Group justify="space-between">
            <Logo size={"small"} />
            <Group>
              {user && <p>{user.name}</p>}
              <CustomButton variant="main" px={48} onClick={logout}>
                logout
              </CustomButton>
              <CustomButton variant="transparent" c={"black"} p={0}>
                Правила
              </CustomButton>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={"lg"}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
});
