import { AppShell, AppShellFooter, Container, Group } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";

export const AuthLayout: FC = observer(() => {
  const { user, logout } = rootStore.userStore;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isFooterVisible = pathname.includes("/rules");

  if (!rootStore.isLoaded) return "...loading";

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size={"lg"}>
          <Group justify="space-between">
            <Logo size={"small"} />
            {user ? (
              <Group>
                {user && <p>{user.name}</p>}
                <CustomButton variant="main" px={48} onClick={logout}>
                  logout
                </CustomButton>
                <CustomButton
                  variant="transparent"
                  c={"black"}
                  p={0}
                  onClick={() => navigate("/rules")}
                >
                  Правила
                </CustomButton>
              </Group>
            ) : (
              <CustomButton
                variant="transparent"
                c={"black"}
                p={0}
                onClick={() => navigate("/rules")}
              >
                Правила
              </CustomButton>
            )}
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
