export const calculateAngles = (pointsCount: number): number[] => {
  return Array.from({ length: pointsCount }, (_, i) => (360 / pointsCount) * i);
};

export const calculatePoints = (angles: number[], radius: number) => {
  return angles.map((angle, i) => {
    const angleRad = (angle * Math.PI) / 180;
    const x = radius * Math.sin(angleRad);
    const y = -radius * Math.cos(angleRad);
    return { x, y, index: i };
  });
};
