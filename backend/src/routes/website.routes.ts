import express from "express";
import { websiteController } from "../controllers/website.controller";

export const websiteRouter = express.Router();

websiteRouter.post("/", websiteController.addWebsite);
websiteRouter.get("/", websiteController.getWebsites);
websiteRouter.get("/:id", websiteController.getWebsite);
websiteRouter.put("/:id", websiteController.updateWebsite);
websiteRouter.delete("/:id", websiteController.deleteWebsite);
