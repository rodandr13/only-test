import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./eventsSlider.module.scss";
import { TimeInterval } from "../../__mocks/types";
import { ButtonControl } from "../buttonControl/ButtonControl";
import "swiper/css";
import "swiper/css/pagination";

interface EventsSliderProps {
  timeIntervals: TimeInterval[];
  activeIndex: number;
}

export const EventsSlider = ({
  activeIndex,
  timeIntervals,
}: EventsSliderProps) => {
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (displayedIndex !== activeIndex && containerRef.current) {
      gsap.to(containerRef.current, {
        duration: 0.4,
        opacity: 0,
        onComplete: () => {
          setDisplayedIndex(activeIndex);
          gsap.to(containerRef.current, {
            duration: 0.4,
            opacity: 1,
          });
        },
      });
    }
  }, [activeIndex, displayedIndex]);

  const events = timeIntervals[displayedIndex].events;

  return (
    <section className={styles.events} ref={containerRef}>
      <Swiper
        slidesPerView={3}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${styles.controlButtonsNext}`,
          prevEl: `.${styles.controlButtonsPrev}`,
        }}
        className={styles.eventsContainer}
        spaceBetween={80}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
          580: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
        }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className={styles.eventsItem}>
            <h2>{event.year}</h2>
            <p>{event.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.controlButtons}>
        <div className={styles.controlButtonsPrev}>
          <ButtonControl direction="prev" variant="filled" />
        </div>
        <div className={styles.controlButtonsNext}>
          <ButtonControl direction="next" variant="filled" />
        </div>
      </div>
    </section>
  );
};
