import styles from "./eventsSlider.module.scss";
import { ButtonControl } from "../buttonControl/ButtonControl";

export const EventsSlider = () => {
  return (
    <section className={styles.events}>
      <div className={styles.controlButtons}>
        <div className={styles.controlButtonsPrev}>
          <ButtonControl direction="prev" variant="filled" />
        </div>
        <div className={styles.controlButtonsNext}>
          <ButtonControl direction="next" variant="filled" />
        </div>
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsItem}>
          <h2>2015</h2>
          <p>
            13 сентября — частное солнечное затмение, видимое в Южной Африке и
            части Антарктиды
          </p>
        </div>
        <div className={styles.eventsItem}>
          <h2>2016</h2>
          <p>
            Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных
            галактик, получившую обозначение GN-z11
          </p>
        </div>
        <div className={styles.eventsItem}>
          <h2>2017</h2>
          <p>
            Компания Tesla официально представила первый в мире электрический
            грузовик Tesla Semi
          </p>
        </div>
      </div>
    </section>
  );
};
