import { Thresholds } from "../types";

export const getBenchmarkSettings = (thresholds: Thresholds) => [
  `Green: Latency below ${thresholds.low[0]} ms.`,
  `Orange: Latency between ${thresholds.medium[0]} ms and ${thresholds.medium[1]} ms.`,
  `Red: Latency over ${thresholds.high[0]} ms.`,
  "Gray: Latency check is missing",
];
