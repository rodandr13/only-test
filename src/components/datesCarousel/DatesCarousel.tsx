import styles from "./datesCarousel.module.scss";
import { ButtonControl } from "../buttonControl/ButtonControl";

export const DatesCarousel = () => {
  return (
    <section>
      <div className={styles.circle}></div>
      <div className={styles.years}>
        <div className={styles.yearsStart}>2015</div>
        <div className={styles.yearsEnd}>2022</div>
      </div>
      <div className={styles.controls}>
        <div className={styles.numberSlides}>06/06</div>
        <div className={styles.buttons}>
          <ButtonControl direction="prev" variant="outline" />
          <ButtonControl direction="next" variant="outline" />
        </div>
      </div>
    </section>
  );
};