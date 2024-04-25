import { AppShell, Container, Group } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "src/components/Logo";
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
              <button onClick={logout}>logout</button>
              <p>Правила</p>
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
