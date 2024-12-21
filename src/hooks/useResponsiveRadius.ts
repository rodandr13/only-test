import { useEffect, useState } from "react";

const useResponsiveRadius = (
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  },
  defaultRadius: number
): number => {
  const calculateRadius = (width: number): number => {
    if (width <= breakpoints.sm) return 0;
    if (width <= breakpoints.md) return 150;
    if (width <= breakpoints.lg) return 185;
    if (width <= breakpoints.xl) return 215;
    return defaultRadius;
  };

  const [radius, setRadius] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return calculateRadius(window.innerWidth);
    }
    return defaultRadius;
  });

  useEffect(() => {
    const handleResize = () => {
      const newRadius = calculateRadius(window.innerWidth);
      setRadius(newRadius);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  return radius;
};

export default useResponsiveRadius;
