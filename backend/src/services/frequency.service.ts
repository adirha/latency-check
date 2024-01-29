import fs from "fs";
import { Frequency, UpdateFrequencyInput } from "../types/frequency.types";
import { Data } from "../types/global.types";

class FrequencyService {
  private async loadData(): Promise<Data> {
    try {
      const data = JSON.parse(await fs.promises.readFile("data.json", "utf-8"));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  private async updateData(newFrequency: Frequency) {
    try {
      const data = await this.loadData();
      const newData: Data = { ...data, samplingFrequency: { ...newFrequency } };
      await fs.promises.writeFile("data.json", JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  }

  async getFrequency(): Promise<Frequency> {
    try {
      const { samplingFrequency } = await this.loadData();
      return samplingFrequency;
    } catch (error) {
      console.log(error);
    }
  }

  async updateFrequency(input: UpdateFrequencyInput): Promise<Frequency> {
    try {
      const { samplingFrequency } = await this.loadData();
      const newSamplingFrequency = { ...samplingFrequency, ...input };
      await this.updateData(newSamplingFrequency);
      return newSamplingFrequency;
    } catch (error) {
      console.log(error);
    }
  }
}

export const frequencyService = new FrequencyService();
