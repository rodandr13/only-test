import { useEffect, useRef } from "react";

import { gsap } from "gsap";

interface UseAnimatedYearsProps {
  from: number;
  to: number;
}

export function useAnimatedYears({ from, to }: UseAnimatedYearsProps) {
  const fromValueRef = useRef<{ value: number }>({ value: from });
  const toValueRef = useRef<{ value: number }>({ value: to });

  const fromElementRef = useRef<HTMLDivElement>(null);
  const toElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(fromValueRef.current, {
      duration: 1,
      value: from,
      ease: "power1.out",
      onUpdate: () => {
        if (fromElementRef.current) {
          fromElementRef.current.textContent = String(
            Math.floor(fromValueRef.current.value)
          );
        }
      },
    });

    gsap.to(toValueRef.current, {
      duration: 1,
      value: to,
      ease: "power1.out",
      onUpdate: () => {
        if (toElementRef.current) {
          toElementRef.current.textContent = String(
            Math.floor(toValueRef.current.value)
          );
        }
      },
    });
  }, [from, to]);

  return {
    fromElementRef,
    toElementRef,
  };
}
