import { Request, Response } from "express";
import { websiteService } from "../services/website.service";
import { CreateWebsiteInput } from "../types/website.types";

class WebsiteController {
  addWebsite = async (req: Request, res: Response) => {
    const data: CreateWebsiteInput = {
      name: req.body.name,
      url: req.body.url,
    };
    const website = await websiteService.createWebsite(data);
    res.status(201).send(website);
  };

  getWebsites = async (req: Request, res: Response) => {
    const websites = await websiteService.getWebsites();
    res.send(websites);
  };

  updateWebsite = async (req: Request, res: Response) => {
    const id = req.params.id;
    const website = await websiteService.updateWebsite(id, req.body);
    res.send(website);
  };

  deleteWebsite = async (req: Request, res: Response) => {
    const id = req.params.id;
    const website = await websiteService.deleteWebsite(id);
    res.send(website);
  };

  getWebsite = async (req: Request, res: Response) => {
    const id = req.params.id;
    const website = await websiteService.getWebsiteById(id);
    res.send(website);
  };
}

export const websiteController = new WebsiteController();
