import { useCallback, useEffect, useMemo, useRef } from "react";

import { gsap } from "gsap";

import styles from "./circleWithPoints.module.scss";
import { TimeInterval } from "../../__mocks/types";
import useCircleRotation from "../../hooks/useCircleRotation";
import useResponsiveRadius from "../../hooks/useResponsiveRadius";
import {
  BREAKPOINTS,
  DEFAULT_RADIUS,
  POINTS_OFFSET,
} from "../../utils/constants";
import { CirclePoint } from "../CirclePoint/CirclePoint";

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
  const radius = useResponsiveRadius(BREAKPOINTS, DEFAULT_RADIUS);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const offset = POINTS_OFFSET;

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
            />
          ))}
        </div>
      </div>
    )
  );
};