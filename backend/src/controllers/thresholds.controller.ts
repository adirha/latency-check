import { Request, Response } from "express";
import { thresholdsService } from "../services/thresholds.service";

class ThresholdsController {
  getThresholds = async (req: Request, res: Response) => {
    const thresholds = await thresholdsService.getThresholds();
    res.send(thresholds);
  };

  updateThresholds = async (req: Request, res: Response) => {
    const thresholds = await thresholdsService.updateThresholds(req.body);
    res.send(thresholds);
  };
}

export const thresholdsController = new ThresholdsController();
