import styles from "./buttonControl.module.scss";
import { ChevronIcon } from "../chevronIcon/ChevronIcon";

interface ButtonControlProps {
  direction: "prev" | "next";
  variant: "filled" | "outline";
  onClick?: () => void;
}

export const ButtonControl = ({
  direction,
  variant,
  onClick,
}: ButtonControlProps) => {
  const classes = `${styles.buttonControl} ${direction === "next" ? styles.next : styles.prev} ${variant === "outline" ? styles.outline : styles.filled}`;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={classes}>
      <button onClick={handleClick} className={styles.button}>
        <ChevronIcon />
      </button>
    </div>
  );
};
