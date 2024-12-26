import { useCallback, useEffect, useMemo, useRef } from "react";

import { gsap } from "gsap";

import styles from "./circleWithPoints.module.scss";
import { TimeInterval } from "../../__mocks/types";
import useCircleRotation from "../../hooks/useCircleRotation";
import useResponsiveRadius from "../../hooks/useResponsiveRadius";
import {
  calculateAngles,
  calculatePoints,
} from "../../utils/circleCalculations";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointsCount = timeIntervals.length;
  const radius = useResponsiveRadius(BREAKPOINTS, DEFAULT_RADIUS);
  const offset = POINTS_OFFSET;
  const angles = useMemo(() => calculateAngles(pointsCount), [pointsCount]);
  const points = useMemo(
    () => calculatePoints(angles, radius),
    [angles, radius]
  );

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
    if (activeIndex) {
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
