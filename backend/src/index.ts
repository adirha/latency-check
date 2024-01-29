import express from "express";
import { frequencyRouter } from "./routes/frequency.routes";
import { websiteRouter } from "./routes/website.routes";
import { thresholdsRouter } from "./routes/thresholds.routes";

const PORT = process.env.PORT || 3001;

const app = express();

// TODO: Understand
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/websites", websiteRouter);
app.use("/api/v1/frequencies", frequencyRouter);
app.use("/api/v1/thresholds", thresholdsRouter);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
