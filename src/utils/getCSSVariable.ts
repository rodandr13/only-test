export const getCSSVariable = (variable: string): number => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  return parseFloat(value) || 0;
};
