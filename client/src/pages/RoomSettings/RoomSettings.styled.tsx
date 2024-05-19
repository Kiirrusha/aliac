import { FC } from "react";
import s from "./RoomSettings.module.scss";

type CircleWithNumberProps = {
  number: number;
  backgroundColor: string;
  hasCloseButton?: boolean;
  onClick?: () => void;
};

type CircleAddTeamProps = {
  onClick?: () => void;
};

export const CircleWithNumber: FC<CircleWithNumberProps> = (props) => {
  const { backgroundColor, number, onClick } = props;
  return (
    <div className={s.Circle} style={{ backgroundColor }}>
      <span className={s.Numbers}>{number}</span>
      {props.hasCloseButton && (
        <button className={s.CloseButton} onClick={onClick}>
          &#10006;
        </button>
      )}
    </div>
  );
};

export const CircleAddTeam: FC<CircleAddTeamProps> = ({ onClick }) => {
  return (
    <div className={s.CircleAdd} onClick={onClick}>
      <button className={s.close}></button>
    </div>
  );
};

CircleWithNumber.defaultProps = {
  hasCloseButton: true,
};
