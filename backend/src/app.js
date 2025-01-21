import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.CORS_ORIGIN],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

export { app };
