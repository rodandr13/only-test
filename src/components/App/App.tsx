import { lazy, Suspense, useEffect, useState } from "react";

import styles from "./app.module.scss";
import { fetchMockData } from "../../__mocks/fetchMockdata";
import { MockData } from "../../__mocks/types";
import { ActiveYears } from "../../types";
import {
  INITIAL_SLIDE_INDEX,
  INITIAL_YEAR_FROM,
  INITIAL_YEAR_TO,
  MOCK_DATA_LATENCY,
} from "../../utils/constants";
import { DatesCarouselSkeleton } from "../Skeletons/DatesCarouselSkeleton";
import { EventsSliderSkeleton } from "../Skeletons/EventsSliderSkeleton";

const DatesCarousel = lazy(() =>
  import("../YearsCarousel/YearsCarousel").then((module) => ({
    default: module.YearsCarousel,
  }))
);

const EventsSlider = lazy(() =>
  import("../EventsSlider/EventsSlider").then((module) => ({
    default: module.EventsSlider,
  }))
);

export const App = () => {
  const [data, setData] = useState<MockData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(INITIAL_SLIDE_INDEX);
  const [activeYears, setActiveYears] = useState<ActiveYears>({
    from: INITIAL_YEAR_FROM,
    to: INITIAL_YEAR_TO,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMockData({ latency: MOCK_DATA_LATENCY });
        setData(response);
        if (response.timeIntervals.length > 0) {
          const { start, end } = response.timeIntervals[INITIAL_SLIDE_INDEX];
          setActiveYears({ from: start, to: end });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const { start, end } = data.timeIntervals[activeIndex];
    if (start !== activeYears.from || end !== activeYears.to) {
      setActiveYears({ from: start, to: end });
    }
  }, [activeIndex, activeYears.from, activeYears.to, data]);

  if (!data) return null;

  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1 className={styles.appTitle}>Исторические даты</h1>
        </div>
        <div className={styles.dates}>
          <Suspense fallback={<DatesCarouselSkeleton />}>
            <DatesCarousel
              activeYears={activeYears}
              timeIntervals={data.timeIntervals}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </Suspense>
        </div>
        <div className={styles.events}>
          <Suspense fallback={<EventsSliderSkeleton />}>
            <EventsSlider
              activeIndex={activeIndex}
              timeIntervals={data.timeIntervals}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
