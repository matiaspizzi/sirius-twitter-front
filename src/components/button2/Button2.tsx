import React, { MouseEventHandler } from "react";
import { ButtonSize2, ButtonType2, StyledButton } from "./StyledButton";

interface ButtonProps {
  text: string;
  buttonSize: ButtonSize2;
  buttonType: ButtonType2;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}
const Button = ({ text, buttonSize, buttonType, onClick, disabled }: ButtonProps) => {
  return (
    <StyledButton
      buttonSize={buttonSize ? buttonSize : ButtonSize2.MEDIUM}
      buttonType={disabled ? ButtonType2.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default Button;