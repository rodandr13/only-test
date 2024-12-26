import styles from "./buttonControl.module.scss";
import { ButtonDirection, ButtonVariant } from "../../types";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";

interface ButtonControlProps {
  direction: ButtonDirection;
  variant: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonControl = ({
  direction,
  variant,
  onClick,
  disabled,
}: ButtonControlProps) => {
  const classes = `${styles.buttonControl} ${direction === "next" ? styles.next : styles.prev} ${variant === "outline" ? styles.outline : styles.filled}`;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${classes}`}
      disabled={disabled}
    >
      <ChevronIcon />
    </button>
  );
};
