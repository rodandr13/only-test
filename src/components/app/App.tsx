import { lazy, Suspense, useEffect, useState } from "react";

import styles from "./app.module.scss";
import { fetchMockData } from "../../__mocks/fetchMockdata";
import { MockData } from "../../__mocks/types";
import { ActiveYears } from "../../types";

const DatesCarousel = lazy(() =>
  import("../datesCarousel/DatesCarousel").then((module) => ({
    default: module.DatesCarousel,
  }))
);

const EventsSlider = lazy(() =>
  import("../eventsSlider/EventsSlider").then((module) => ({
    default: module.EventsSlider,
  }))
);

export const App = () => {
  const [data, setData] = useState<MockData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeYears, setActiveYears] = useState<ActiveYears>({
    from: 0,
    to: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetchMockData({ latency: 0 });
      setData(response);
      if (response.timeIntervals.length > 0) {
        const { start, end } = response.timeIntervals[0];
        setActiveYears({ from: start, to: end });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const { start, end } = data.timeIntervals[activeIndex];
      setActiveYears({ from: start, to: end });
    }
  }, [activeIndex, data]);
  if (!data) return null;

  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1 className={styles.appTitle}>Исторические даты</h1>
        </div>
        <div className={styles.dates}>
          <Suspense fallback={<div>Загрузка</div>}>
            <DatesCarousel
              activeYears={activeYears}
              timeIntervals={data.timeIntervals}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </Suspense>
        </div>
        <div className={styles.events}>
          <Suspense fallback={<div>Загрузка</div>}>
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
