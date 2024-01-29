export interface Website {
  id: string;
  name: string;
  url: string;
  msLatency?: number;
}

export interface CreateWebsiteInput {
  name: string;
  url: string;
}

export interface UpdateWebsiteInput {
  name?: string;
  url?: string;
  msLatency?: number;
}

export interface ReplaceAllWebsiteInput {
  websites: Website[];
}
