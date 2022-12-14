import React from "react";
import * as S from "./dialogBox.styled";

interface ContainerProps {
  children: React.ReactNode;
  layoutId?: string;
}
const DialogBox = ({ children, layoutId }: ContainerProps) => {
  return (
    <S.Backdrop>
      <S.Dialog layoutId={layoutId}>{children}</S.Dialog>
    </S.Backdrop>
  );
};

export default DialogBox;
