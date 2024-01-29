import { Frequency } from "./frequency.types";
import { Thresholds } from "./thresholds.types";
import { Website } from "./website.types";

export interface Data {
  websites: Website[];
  samplingFrequency: Frequency;
  thresholds: Thresholds;
}
