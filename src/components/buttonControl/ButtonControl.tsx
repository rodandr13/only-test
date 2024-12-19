import styles from "./buttonControl.module.scss";
import { ChevronIcon } from "../chevronIcon/ChevronIcon";

interface ButtonControlProps {
  direction: "prev" | "next";
  variant: "filled" | "outline";
}

export const ButtonControl = ({ direction, variant }: ButtonControlProps) => {
  const classes = `${styles.buttonControl} ${direction === "next" ? styles.next : styles.prev} ${variant === "outline" ? styles.outline : styles.filled}`;

  return (
    <div className={classes}>
      <button className={styles.button}>
        <ChevronIcon />
      </button>
    </div>
  );
};
