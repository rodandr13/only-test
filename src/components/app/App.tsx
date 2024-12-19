import styles from "./app.module.scss";
import { DatesCarousel } from "../datesCarousel/DatesCarousel";
import { EventsSlider } from "../eventsSlider/EventsSlider";

export const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1 className={styles.appTitle}>Исторические даты</h1>
        </div>
        <div className={styles.dates}>
          <DatesCarousel />
        </div>
        <div className={styles.events}>
          <EventsSlider />
        </div>
      </div>
    </div>
  );
};
