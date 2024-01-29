export type Website = {
  id: string;
  name: string;
  url: string;
  msLatency?: number;
};

export interface IAddWebsiteFormValues {
  name: string;
  url: string;
}

export interface IFrequencyFormValues {
  time: string;
}

export interface IThresholdsFormValues extends Thresholds {}

export type Frequency = {
  msTime: number;
};

export type Thresholds = {
  low: number[];
  medium: number[];
  high: number[];
};
