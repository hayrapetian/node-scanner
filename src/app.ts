import express, { Application, json, Request, Response } from "express";
import "colors";
import cors from "cors";
import { WebsitesArr } from "./types";
import { scanWebsite } from "./helpers";

const app: Application = express();
app.use(cors());
app.use(json());

const PORT: string | number = process.env.PORT || 3000;
const ENV: string = process.env.NODE_ENV || "development";

const openedUrls: Record<string, boolean> = {};

const scanWebsites = async (arr: WebsitesArr) => {
  const data = await Promise.all(
    arr.map(async (i) => {
      const websiteUrl = i._website[0];
      return await scanWebsite(websiteUrl, openedUrls);
    })
  );
  return data.flat();
};

app.get("/", async (_req: Request, res: Response) => {
  const output = await scanWebsites([
    { _website: ["https://example1.com/"] },
    { _website: ["https://example2.com"] },
  ]);
  return res.send(output);
});

app.listen(PORT, () =>
  console.log(
    `Server:`.inverse.yellow.bold + ` Running in ${ENV} mode on port ${PORT}`
  )
);
