import styled from "styled-components";
import "@fontsource/manrope";

interface ButtonProps {
  buttonSize: ButtonSize2;
  buttonType: ButtonType2;
}
export enum ButtonType2 {
  DISABLED = "DISABLED",
  OUTLINED = "OUTLINED",
  FULLFILLED = "FULLFILLED",
  GHOST = "GHOST",
  WHITE = "WHITE"
}

export enum ButtonSize2 {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 8px;
    margin-bottom: 8px;
    width: ${(props) => {
      switch (props.buttonSize) {
        case ButtonSize2.SMALL:
          return "100px";
        case ButtonSize2.MEDIUM:
          return "150px";
        case ButtonSize2.LARGE:
          return "200px";
        default:
          return "150px";
      }
    }};
    height: 33px;
    left: 16px;
    top: 16px;

    background: ${(props) => {
      switch (props.buttonType) {
        case "FULLFILLED":
          return props.theme.colors.main;
        case "WHITE":
          return props.theme.colors.white;
        case "OUTLINED":
          return props.theme.colors.main;
        case "DISABLED":
          return props.theme.colors.light;
        case "GHOST":
          return "transparent";
        default:
          return props.theme.colors.main;
      }
    }};
    border-radius: 40px;

    /* Button */
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) =>
      props.buttonType === "OUTLINED" || props.buttonType === "GHOST"
        ? `1px solid ${props.theme.colors.black}`
        : "none"};

    color: ${(props) => {
      switch (props.buttonType) {
        case "WHITE":
          return props.theme.colors.black
        case "OUTLINED":
          return props.theme.colors.black
        case "GHOST":
          return props.theme.colors.main
        default:
          return props.theme.colors.white
      }
    }}

    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
        background: ${(props) => {
          switch (props.buttonType) {
            case ButtonType2.OUTLINED:
              return props.theme.hover.outlined;
            case ButtonType2.FULLFILLED:
              return props.theme.hover.default;
          }
        }}
`;
export default StyledButton;