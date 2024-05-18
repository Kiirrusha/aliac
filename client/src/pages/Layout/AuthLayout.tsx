import { AppShell, Container, Group } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { CustomButton } from "src/shared/ui/CustomButton";
import { rootStore } from "src/stores/RootStore";
import icon from "../../assets/svg/Icon.svg";

export const AuthLayout: FC = observer(() => {
  const { user, logout } = rootStore.userStore;
  const params = useParams();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size={"lg"}>
          <Group justify="space-between">
            <Logo size={"small"} />
            {user ? (
              <Group>
                <Link to={`/room/${params.roomId}/settings`}>
                  <CustomButton variant="transparent">
                    <img key="icon" src={icon} alt="Icon" />
                  </CustomButton>
                </Link>
                {user && <p>{user.name}</p>}
                <CustomButton variant="main" px={48} onClick={logout}>
                  logout
                </CustomButton>
                <CustomButton variant="transparent" c={"black"} p={0}>
                  Правила
                </CustomButton>
              </Group>
            ) : (
              <CustomButton variant="transparent" c={"black"} p={0}>
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
