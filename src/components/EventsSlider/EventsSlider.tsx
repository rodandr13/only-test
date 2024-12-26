import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./eventsSlider.module.scss";
import { TimeInterval } from "../../__mocks/types";
import { BREAKPOINTS, FADE_DURATION } from "../../utils/constants";
import { ButtonControl } from "../ButtonControl/ButtonControl";
import "swiper/css";

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
    const isMobile = window.matchMedia(
      `(max-width: ${BREAKPOINTS.sm}px)`
    ).matches;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (displayedIndex !== activeIndex && containerRef.current) {
      gsap.to(containerRef.current, {
        duration: FADE_DURATION,
        opacity: 0,
        onComplete: () => {
          setDisplayedIndex(activeIndex);

          const animationConfig: gsap.TweenVars = {
            opacity: 1,
            duration: FADE_DURATION,
          };

          if (isMobile) {
            animationConfig.y = 0;
            gsap.fromTo(
              containerRef.current,
              { opacity: 0, y: 20 },
              animationConfig
            );
          } else {
            gsap.to(containerRef.current, animationConfig);
          }
        },
      });
    }
  }, [activeIndex, displayedIndex]);

  const events = timeIntervals[displayedIndex].events;

  return (
    <section className={styles.events} ref={containerRef}>
      <h2 className={styles.intervalName}>
        {timeIntervals[displayedIndex].name}
      </h2>
      <Swiper
        slidesPerView={1.5}
        autoHeight={true}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${styles.controlButtonsNext}`,
          prevEl: `.${styles.controlButtonsPrev}`,
        }}
        className={styles.eventsContainer}
        spaceBetween={25}
        breakpoints={{
          [BREAKPOINTS.sm]: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          [BREAKPOINTS.lg]: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          [BREAKPOINTS.xl]: {
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
