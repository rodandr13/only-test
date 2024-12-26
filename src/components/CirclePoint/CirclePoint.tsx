import { KeyboardEvent, memo } from "react";

import styles from "./circlePoint.module.scss";

interface CirclePointProps {
  x: number;
  y: number;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  title: string;
}

export const CirclePoint = memo(
  ({ x, y, index, isActive, onClick, title }: CirclePointProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick(index);
      }
    };

    return (
      <div
        data-point
        onClick={() => onClick(index)}
        className={`${styles.point} ${isActive ? styles.pointActive : ""}`}
        style={{ left: `${x}px`, top: `${y}px` }}
        role="button"
        aria-pressed={isActive}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.pointNumber}>{index + 1}</span>
        <p
          className={`${styles.pointTitle} ${
            isActive ? styles.pointTitleActive : ""
          }`}
        >
          {title}
        </p>
      </div>
    );
  }
);

CirclePoint.displayName = "CirclePoint";
