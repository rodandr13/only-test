import styles from "./skeleton.module.scss";

export const EventsSliderSkeleton = () => {
  return (
    <div className={styles.eventsContainer}>
      <div className={styles.event}>
        <div className={`${styles.eventHeader} ${styles.skeleton}`}></div>
        <div className={`${styles.eventDescription} ${styles.skeleton}`}></div>
      </div>
      <div className={styles.event}>
        <div className={`${styles.eventHeader} ${styles.skeleton}`}></div>
        <div className={`${styles.eventDescription} ${styles.skeleton}`}></div>
      </div>
      <div className={styles.event}>
        <div className={`${styles.eventHeader} ${styles.skeleton}`}></div>
        <div className={`${styles.eventDescription} ${styles.skeleton}`}></div>
      </div>
    </div>
  );
};
