import { Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "src/components/Auth";
import { Logo } from "src/components/Logo";
import { PeoplesImg } from "src/components/PeoplesImg";
import { rootStore } from "src/stores/RootStore";
import s from "./Login.module.scss";
import { CustomButton } from "src/shared/ui/CustomButton";
export const Login: FC = observer(() => {
  const user_name = rootStore.userStore.user?.name;
  const [opened, { open, close }] = useDisclosure(false);

  if (user_name) return <Navigate to={`/`} />;

  return (
    <>
      <Stack align="center">
        <Stack align="center">
          <Logo size={"large"} />
          <PeoplesImg />
          <CustomButton variant="main" px={40} onClick={open}>
            Играть
          </CustomButton>
        </Stack>
      </Stack>

      <Modal
        className={s.customModal}
        overlayProps={{ backgroundOpacity: 0.8 }}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Auth />
      </Modal>
    </>
  );
});
