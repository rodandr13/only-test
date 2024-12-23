import { useCallback, useRef } from "react";

import { gsap } from "gsap";

interface UseCircleRotationProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  pointsCount: number;
  offset: number;
  setIsRotating: (rotating: boolean) => void;
}

const useCircleRotation = ({
  wrapperRef,
  pointsCount,
  offset,
  setIsRotating,
}: UseCircleRotationProps) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const rotateToIndex = useCallback(
    (idx: number): number => {
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
    [rotateToIndex, wrapperRef, setIsRotating]
  );

  return { rotateCircle };
};

export default useCircleRotation;
