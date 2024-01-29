import fs from "fs";
import { v4 as uuid } from "uuid";
import { Data } from "../types/global.types";
import {
  CreateWebsiteInput,
  UpdateWebsiteInput,
  Website,
} from "../types/website.types";

class WebsiteService {
  private async loadData(): Promise<Data> {
    try {
      const data = JSON.parse(await fs.promises.readFile("data.json", "utf-8"));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  private async updateData(newWebsites: Website[]) {
    try {
      const data = await this.loadData();
      const newData: Data = { ...data, websites: [...newWebsites] };
      await fs.promises.writeFile("data.json", JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  }

  async createWebsite(input: CreateWebsiteInput): Promise<Website> {
    try {
      const { websites: prevWebsites } = await this.loadData();
      const newWebsite = { ...input, id: uuid() };
      const websites = [...prevWebsites, newWebsite];
      await this.updateData(websites);
      return newWebsite;
    } catch (error) {
      console.log(error);
    }
  }

  async getWebsites(): Promise<Website[]> {
    try {
      const { websites } = await this.loadData();
      return websites;
    } catch (error) {
      console.log(error);
    }
  }

  async getWebsiteById(id: string): Promise<Website> {
    try {
      const { websites } = await this.loadData();
      const website = websites.find(({ id: currentId }) => currentId === id);
      return website;
    } catch (error) {
      console.log(error);
    }
  }

  async updateWebsite(id: string, input: UpdateWebsiteInput): Promise<Website> {
    try {
      const { websites } = await this.loadData();
      let updatedWebsite: Website;
      const updatedWebsites = websites.map((website) => {
        if (website.id === id) {
          updatedWebsite = { id, ...website, ...input };
          return updatedWebsite;
        }
        return website;
      });
      await this.updateData(updatedWebsites);
      return updatedWebsite;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteWebsite(id: string): Promise<Website[]> {
    try {
      const { websites } = await this.loadData();
      const newWebsites = websites.filter(
        ({ id: currentId }) => currentId !== id
      );
      await this.updateData(newWebsites || []);
      return newWebsites;
    } catch (error) {
      console.log(error);
    }
  }
}

export const websiteService = new WebsiteService();
