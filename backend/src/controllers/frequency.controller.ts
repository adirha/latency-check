import { Request, Response } from "express";
import { frequencyService } from "../services/frequency.service";

class FrequencyController {
  getFrequency = async (req: Request, res: Response) => {
    const frequency = await frequencyService.getFrequency();
    res.send(frequency);
  };

  updateFrequency = async (req: Request, res: Response) => {
    const frequency = await frequencyService.updateFrequency(req.body);
    res.send(frequency);
  };
}

export const frequencyController = new FrequencyController();
