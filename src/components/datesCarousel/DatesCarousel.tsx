import styles from "./datesCarousel.module.scss";
import { TimeInterval } from "../../__mocks/types";
import { ActiveYears } from "../../types";
import { ButtonControl } from "../buttonControl/ButtonControl";
import { CircleWithPoints } from "../circleWithPoints/CircleWithPoints";
import { YearsInterval } from "../yearsInterval/YearsInterval";

interface DatesCarouselProps {
  timeIntervals: TimeInterval[];
  activeYears: ActiveYears;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

export const DatesCarousel = ({
  timeIntervals,
  activeYears,
  setActiveIndex,
  activeIndex,
}: DatesCarouselProps) => {
  return (
    <section>
      <CircleWithPoints
        setActiveIndex={setActiveIndex}
        timeIntervals={timeIntervals}
        activeIndex={activeIndex}
      />
      <YearsInterval activeYears={activeYears} />
      <div className={styles.controls}>
        <div className={styles.numberSlides}>06/06</div>
        <div className={styles.buttons}>
          <ButtonControl
            direction="prev"
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
          <ButtonControl
            direction="next"
            variant="outline"
            onClick={() => setActiveIndex(activeIndex + 1)}
          />
        </div>
      </div>
    </section>
  );
};
