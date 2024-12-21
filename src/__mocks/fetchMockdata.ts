import { data } from "./data";
import { MockData } from "./types";

export const fetchMockData = ({
  latency,
}: {
  latency: number;
}): Promise<MockData> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, latency);
  });
};
