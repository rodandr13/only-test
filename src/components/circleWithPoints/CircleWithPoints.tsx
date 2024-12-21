import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";

import styles from "./circleWithPoints.module.scss";
import { TimeInterval } from "../../__mocks/types";
import useResponsiveRadius from "../../hooks/useResponsiveRadius";

interface CircleWithPointsProps {
  timeIntervals: TimeInterval[];
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

const getCSSVariable = (variable: string): number => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  return parseFloat(value) || 0;
};

export const CircleWithPoints = ({
  timeIntervals,
  setActiveIndex,
  activeIndex,
}: CircleWithPointsProps) => {
  const pointsCount = timeIntervals.length;
  const defaultRadius = 265;

  const breakpoints = useMemo(
    () => ({
      sm: getCSSVariable("--breakpoint-sm"),
      md: getCSSVariable("--breakpoint-md"),
      lg: getCSSVariable("--breakpoint-lg"),
      xl: getCSSVariable("--breakpoint-xl"),
    }),
    []
  );
  const radius = useResponsiveRadius(breakpoints, defaultRadius);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  const offset = 30;

  const angles = useMemo(
    () =>
      Array.from({ length: pointsCount }, (_, i) => (360 / pointsCount) * i),
    [pointsCount]
  );

  const points = useMemo(() => {
    return angles.map((angle, i) => {
      const angleRad = (angle * Math.PI) / 180;
      const x = radius * Math.sin(angleRad);
      const y = -radius * Math.cos(angleRad);
      return { x, y, index: i };
    });
  }, [angles, radius]);

  const rotateToIndex = useCallback(
    (idx: number) => {
      const anglePerPoint = 360 / pointsCount;
      return offset - anglePerPoint * idx;
    },
    [pointsCount, offset]
  );

  const rotateCircle = useCallback(
    (index: number) => {
      if (!wrapperRef.current) return;

      setIsRotating(false);

      const targetRotation = rotateToIndex(index);
      const pointsElements =
        wrapperRef.current.querySelectorAll("[data-point]");

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline({
        onComplete: () => setIsRotating(true),
      });

      timelineRef.current.to(
        wrapperRef.current,
        {
          rotation: targetRotation,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      timelineRef.current.to(
        pointsElements,
        {
          rotation: -targetRotation,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      timelineRef.current.play();
    },
    [rotateToIndex]
  );

  const handleClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      rotateCircle(index);
    },
    [setActiveIndex, rotateCircle]
  );

  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== null) {
      rotateCircle(activeIndex);
    }
  }, [activeIndex, rotateCircle]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.set(wrapperRef.current, { rotation: offset });

    const pointsElements = wrapperRef.current.querySelectorAll("[data-point]");
    gsap.set(pointsElements, { rotation: -offset });
  }, [offset, radius]);

  return (
    radius > 0 && (
      <div className={styles.circle}>
        <div className={styles.pointsContainer} ref={wrapperRef}>
          {points.map(({ x, y, index }) => (
            <div
              key={index}
              data-point
              onClick={() => handleClick(index)}
              className={`${styles.point} ${
                activeIndex === index ? styles.pointActive : ""
              }`}
              style={{ left: `${x}px`, top: `${y}px` }}
              role="button"
              aria-pressed={activeIndex === index}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(index);
                }
              }}
            >
              <span className={styles.pointNumber}>{index + 1}</span>
              <p
                className={`${styles.pointTitle} ${
                  activeIndex === index && isRotating
                    ? styles.pointTitleActive
                    : ""
                }`}
              >
                {timeIntervals[index].name}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};
