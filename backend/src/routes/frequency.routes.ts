import express from "express";
import { frequencyController } from "../controllers/frequency.controller";

export const frequencyRouter = express.Router();

frequencyRouter.get("/", frequencyController.getFrequency);
frequencyRouter.put("/", frequencyController.updateFrequency);
