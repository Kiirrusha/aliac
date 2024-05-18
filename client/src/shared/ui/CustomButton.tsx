import { Button, ButtonProps } from "@mantine/core";
import { FC, ReactNode } from "react";

type MainButtonProps = ButtonProps & {
  variant: "main" | "transparent";
  children: ReactNode;
  onClick?: () => void;
};

export const CustomButton: FC<MainButtonProps> = ({ ...props }) => {
  const { children, variant, ...rest } = props;
  const buttonStyles = {
    main: {
      fontSize: "20px",
    },
    transparent: {
      color: "white",
      fontSize: "20px",
    },
  };
  const buttonVariant = {
    main: "filled",
    transparent: "transparent",
  };

  const styles = buttonStyles[variant];
  const buttonVariants = buttonVariant[variant];

  return (
    <Button style={styles} variant={buttonVariants} color="#EC6D75" {...rest}>
      {children}
    </Button>
  );
};
