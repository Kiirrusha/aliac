import { Button, ButtonProps } from "@mantine/core";
import { FC } from "react";

type MainButtonProps = ButtonProps & {
  variant: "main" | "transparent";
  children: string;
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

  // убрать лишние варианты, в тексте в теме через компонент прописать белый цвет и в тайтле, разобраться с хедером почему двигается

  return (
    <Button style={styles} variant={buttonVariants} color="#EC6D75" {...rest}>
      {children}
    </Button>
  );
};
