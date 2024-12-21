import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

interface UseAnimatedYearsProps {
  from: number;
  to: number;
}

export const useAnimatedYears = ({ from, to }: UseAnimatedYearsProps) => {
  const [displayFrom, setDisplayFrom] = useState(from);
  const [displayTo, setDisplayTo] = useState(to);

  const fromRef = useRef<{ value: number }>({ value: from });
  const toRef = useRef<{ value: number }>({ value: to });

  useEffect(() => {
    gsap.to(fromRef.current, {
      duration: 1,
      value: from,
      ease: "power1.out",
      onUpdate: () => {
        setDisplayFrom(Math.floor(fromRef.current.value));
      },
    });

    gsap.to(toRef.current, {
      duration: 1,
      value: to,
      ease: "power1.out",
      onUpdate: () => {
        setDisplayTo(Math.floor(toRef.current.value));
      },
    });
  }, [from, to]);

  return { displayFrom, displayTo };
};
