import fs from "fs";
import { Data } from "../types/global.types";
import { Thresholds, UpdateThresholdsInput } from "../types/thresholds.types";

class ThresholdsService {
  private async loadData(): Promise<Data> {
    try {
      const data = JSON.parse(await fs.promises.readFile("data.json", "utf-8"));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  private async updateData(newThresholds: Thresholds) {
    try {
      const data = await this.loadData();
      const newData: Data = { ...data, thresholds: { ...newThresholds } };
      await fs.promises.writeFile("data.json", JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  }

  async getThresholds(): Promise<Thresholds> {
    try {
      const { thresholds } = await this.loadData();
      return thresholds;
    } catch (error) {
      console.log(error);
    }
  }

  async updateThresholds(input: UpdateThresholdsInput): Promise<Thresholds> {
    try {
      await this.updateData(input);
      return input;
    } catch (error) {
      console.log(error);
    }
  }
}

export const thresholdsService = new ThresholdsService();
