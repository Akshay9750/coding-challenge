import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
// import { fileURLToPath } from "url";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.CORS_ORIGIN],
  })
);

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// console.log("Serving from: ", path.join(__dirname, "../frontend/dist"));

//Routes
import {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
} from "./controllers/transaction.controller.js";

app.get("/api/transactions", getTransactions);
app.get("/api/statistics", getStatistics);
app.get("/api/bar-chart-data", getBarChartData);
app.get("/api/pie-chart-data", getPieChartData);
app.get("/api/combined-data", getCombinedData);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

export { app };
