import { useEffect } from "react";

import { useAnimatedYears } from "../../hooks/useAnimatedYears";
import { ActiveYears } from "../../types";
import styles from "../YearsCarousel/datesCarousel.module.scss";

interface YearsIntervalProps {
  activeYears: ActiveYears;
}

export const YearsInterval = ({ activeYears }: YearsIntervalProps) => {
  const { fromElementRef, toElementRef } = useAnimatedYears({
    from: activeYears.from,
    to: activeYears.to,
  });
  useEffect(() => {
    if (fromElementRef.current) {
      fromElementRef.current.textContent = String(activeYears.from);
    }
    if (toElementRef.current) {
      toElementRef.current.textContent = String(activeYears.to);
    }
  }, [activeYears.from, activeYears.to, fromElementRef, toElementRef]);

  return (
    <div className={styles.years}>
      <div ref={fromElementRef} className={styles.yearsStart}></div>
      <div ref={toElementRef} className={styles.yearsEnd}></div>
    </div>
  );
};
