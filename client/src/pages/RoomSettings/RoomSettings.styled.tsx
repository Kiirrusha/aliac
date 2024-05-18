import { FC } from "react";
import styled from "styled-components";

const Circle = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: grid;
  place-content: center;
`;

const Numbers = styled.span`
  font-size: 100px;
  color: black;
  opacity: 0.75;
  line-height: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: white;
  color: red;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

type Props = {
  number: number;
  backgroundColor: string;
  hasCloseButton?: boolean;
};

export const CircleWithNumber: FC<Props> = (props) => {
  const { backgroundColor, number } = props;
  return (
    <Circle style={{ backgroundColor }}>
      <Numbers>{number}</Numbers>
      {props.hasCloseButton &&<CloseButton>&#10006;</CloseButton>}
    </Circle>
  );
};

CircleWithNumber.defaultProps = {
  hasCloseButton: true,
}
