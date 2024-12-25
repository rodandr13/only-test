import styles from "./skeleton.module.scss";

export const DatesCarouselSkeleton = () => {
  return (
    <div>
      <div className={`${styles.yearsContainer}`}>
        <div className={styles.years}>
          <div className={`${styles.skeleton} ${styles.year}`}></div>
          <div className={`${styles.skeleton} ${styles.year}`}></div>
        </div>
        <div
          className={`${styles.skeleton} ${styles.dot} ${styles.circleDot}`}
        ></div>
      </div>
    </div>
  );
};
