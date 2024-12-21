import { useAnimatedYears } from "../../hooks/useAnimatedYears";
import { ActiveYears } from "../../types";
import styles from "../datesCarousel/datesCarousel.module.scss";

interface YearsIntervalProps {
  activeYears: ActiveYears;
}

export const YearsInterval = ({ activeYears }: YearsIntervalProps) => {
  const { displayFrom, displayTo } = useAnimatedYears({
    from: activeYears.from,
    to: activeYears.to,
  });

  return (
    <div className={styles.years}>
      <div className={styles.yearsStart}>{displayFrom}</div>
      <div className={styles.yearsEnd}>{displayTo}</div>
    </div>
  );
};
