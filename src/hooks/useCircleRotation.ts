import { RefObject, useCallback, useRef } from "react";

import { gsap } from "gsap";

import { ANIMATION_DURATION } from "../utils/constants";

interface UseCircleRotationProps {
  wrapperRef: RefObject<HTMLDivElement | null>;
  pointsCount: number;
  offset: number;
}

const useCircleRotation = ({
  wrapperRef,
  pointsCount,
  offset,
}: UseCircleRotationProps) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const rotateToIndex = useCallback(
    (index: number): number => {
      const anglePerPoint = 360 / pointsCount;
      return offset - anglePerPoint * index;
    },
    [pointsCount, offset]
  );

  const rotateCircle = useCallback(
    (index: number) => {
      if (!wrapperRef.current) return;

      const targetRotation = rotateToIndex(index);
      const pointsElements =
        wrapperRef.current.querySelectorAll("[data-point]");

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline({});

      timelineRef.current.to(
        wrapperRef.current,
        {
          rotation: targetRotation,
          duration: ANIMATION_DURATION,
          ease: "power2.inOut",
        },
        0
      );

      timelineRef.current.to(
        pointsElements,
        {
          rotation: -targetRotation,
          duration: ANIMATION_DURATION,
          ease: "power2.inOut",
        },
        0
      );

      timelineRef.current.play();
    },
    [rotateToIndex, wrapperRef]
  );

  return { rotateCircle };
};

export default useCircleRotation;
