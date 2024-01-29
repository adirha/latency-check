import express from "express";
import { thresholdsController } from "../controllers/thresholds.controller";

export const thresholdsRouter = express.Router();

thresholdsRouter.get("/", thresholdsController.getThresholds);
thresholdsRouter.put("/", thresholdsController.updateThresholds);
