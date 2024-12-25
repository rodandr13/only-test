import styles from "./datesCarousel.module.scss";
import { TimeInterval } from "../../__mocks/types";
import { ActiveYears } from "../../types";
import { ButtonControl } from "../ButtonControl/ButtonControl";
import { CircleWithPoints } from "../CircleWithPoints/CircleWithPoints";
import { YearsInterval } from "../YearsInterval/YearsInterval";

interface DatesCarouselProps {
  timeIntervals: TimeInterval[];
  activeYears: ActiveYears;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

export const YearsCarousel = ({
  timeIntervals,
  activeYears,
  setActiveIndex,
  activeIndex,
}: DatesCarouselProps) => {
  const currentInterval = activeIndex + 1;
  const countIntervals = timeIntervals.length;

  return (
    <section>
      <CircleWithPoints
        setActiveIndex={setActiveIndex}
        timeIntervals={timeIntervals}
        activeIndex={activeIndex}
      />
      <YearsInterval activeYears={activeYears} />
      <div className={styles.controls}>
        <div className={styles.numberSlides}>
          {`${currentInterval.toString().padStart(2, "0")}/${countIntervals
            .toString()
            .padStart(2, "0")}`}
        </div>
        <div className={`${styles.buttons}`}>
          <ButtonControl
            disabled={activeIndex === 0}
            direction="prev"
            variant="outline"
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          />
          <ButtonControl
            disabled={activeIndex === countIntervals - 1}
            direction="next"
            variant="outline"
            onClick={() =>
              setActiveIndex(Math.min(countIntervals - 1, activeIndex + 1))
            }
          />
        </div>
      </div>
      <div className={styles.bullets}>
        {timeIntervals.map((_, index) => (
          <button
            key={`bullet-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`${styles.bullet} ${
              index === activeIndex ? styles.bulletActive : ""
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};
