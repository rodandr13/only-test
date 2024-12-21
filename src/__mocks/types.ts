export type YearEvent = {
  id: string;
  year: number;
  description: string;
};

export type TimeInterval = {
  id: string;
  name: string;
  start: number;
  end: number;
  events: YearEvent[];
};

export type MockData = {
  timeIntervals: TimeInterval[];
};
