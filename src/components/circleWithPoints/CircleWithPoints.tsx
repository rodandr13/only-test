import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";

import styles from "./circleWithPoints.module.scss";
import { TimeInterval } from "../../__mocks/types";
import useCircleRotation from "../../hooks/useCircleRotation";
import useResponsiveRadius from "../../hooks/useResponsiveRadius";
import { getCSSVariable } from "../../utils/getCSSVariable";
import { CirclePoint } from "../circlePoint/CirclePoint";

interface CircleWithPointsProps {
  timeIntervals: TimeInterval[];
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

export const CircleWithPoints = ({
  timeIntervals,
  setActiveIndex,
  activeIndex,
}: CircleWithPointsProps) => {
  const pointsCount = timeIntervals.length;
  const defaultRadius = 265;

  const breakpoints = useMemo(
    () => ({
      xs: getCSSVariable("--breakpoint-xs"),
      sm: getCSSVariable("--breakpoint-sm"),
      md: getCSSVariable("--breakpoint-md"),
      lg: getCSSVariable("--breakpoint-lg"),
      xl: getCSSVariable("--breakpoint-xl"),
    }),
    []
  );
  const radius = useResponsiveRadius(breakpoints, defaultRadius);

  const wrapperRef = useRef<HTMLDivElement>(null);
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

  const { rotateCircle } = useCircleRotation({
    wrapperRef,
    pointsCount,
    offset,
    setIsRotating,
  });

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
  }, [radius, activeIndex, rotateCircle]);

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
            <CirclePoint
              key={index}
              x={x}
              y={y}
              index={index}
              isActive={activeIndex === index}
              onClick={handleClick}
              title={timeIntervals[index].name}
              isRotating={isRotating}
            />
          ))}
        </div>
      </div>
    )
  );
};
