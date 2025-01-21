import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

const getTransactions = asyncHandler(async (req, res) => {
  const { search = "", month = "", page = 1, perPage = 10 } = req.query;

  const collection = mongoose.connection.collection("products");

  const limit = parseInt(perPage, 10) || 10;
  const skip = (parseInt(page, 10) - 1) * limit;

  const searchFilter = {
    $and: [
      search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { price: { $regex: search, $options: "i" } },
            ],
          }
        : {},
      month ? { month: { $regex: month, $options: "i" } } : {},
    ],
  };

  const total = await collection.countDocuments(searchFilter); // Total records matching search and month
  const transactions = await collection
    .find(searchFilter)
    .skip(skip)
    .limit(limit)
    .toArray();

  res.status(200).json(
    new ApiResponse(200, "Transactions fetched successfully", {
      transactions,
      total,
      page: parseInt(page, 10),
      perPage: limit,
      totalPages: Math.ceil(total / limit),
    })
  );
});

const getStatistics = asyncHandler(async (req, res) => {
  const { month = "" } = req.query;
  if (!month) {
    throw new ApiError(400, "Month is required");
  }
  const collection = mongoose.connection.collection("products");

  const stats = await collection
    .aggregate([
      {
        $match: { month: { $regex: month, $options: "i" } },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: {
              $cond: [{ $eq: ["$sold", true] }, "$price", 0], // Sum price if sold
            },
          },
          soldItems: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] }, // Count sold items
          },
          notSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] }, // Count not sold items
          },
        },
      },
    ])
    .toArray();

  if (stats.length === 0) {
    throw new ApiError(400, "No transactions found for this month");
  }
  console.log(stats);
  const { totalSales, soldItems, notSoldItems } = stats[0];

  return res.status(200).json(
    new ApiResponse(200, "Statistics fetched successfully", {
      totalSales,
      soldItems,
      notSoldItems,
    })
  );
});

const getBarChartData = asyncHandler(async (req, res) => {
  const { month = "" } = req.query;
  if (!month) {
    throw new ApiError(400, "Month is required");
  }
  const collection = mongoose.connection.collection("products");

  const priceRanges = [
    { range: "0 - 100", min: 0, max: 100 },
    { range: "101 - 200", min: 101, max: 200 },
    { range: "201 - 300", min: 201, max: 300 },
    { range: "301 - 400", min: 301, max: 400 },
    { range: "401 - 500", min: 401, max: 500 },
    { range: "501 - 600", min: 501, max: 600 },
    { range: "601 - 700", min: 601, max: 700 },
    { range: "701 - 800", min: 701, max: 800 },
    { range: "801 - 900", min: 801, max: 900 },
    { range: "901 and above", min: 901, max: Infinity },
  ];

  const stats = await collection
    .aggregate([
      { $match: { month: { $regex: month, $options: "i" } } }, // Match the month case-insensitively
      {
        $project: {
          price: 1, // Only include price in the projection
          month: 1, // Include month to filter for the selected month
        },
      },
      {
        $group: {
          _id: null, // We're grouping all records together for the month
          items: { $push: "$$ROOT" }, // Push all the documents into an array
        },
      },
    ])
    .toArray();

  if (stats.length === 0) {
    throw new ApiError(400, "No transactions found for this month");
  }

  const itemCounts = priceRanges.map((range) => {
    const count = stats[0].items.filter(
      (item) => item.price >= range.min && item.price <= range.max
    ).length;
    return {
      range: range.range,
      count,
    };
  });

  return res.status(200).json(
    new ApiResponse(200, "Statistics fetched successfully", {
      itemCounts,
    })
  );
});

const getPieChartData = asyncHandler(async (req, res) => {
  const { month = "" } = req.query;
  if (!month) {
    throw new ApiError(400, "Month is required");
  }
  const collection = mongoose.connection.collection("products");

  const categoryStats = await collection
    .aggregate([
      { $match: { month: { $regex: month, $options: "i" } } }, // Match the month case-insensitively
      {
        $group: {
          _id: "$category",
          itemCount: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id", // Rename _id to category for clarity
          itemCount: 1, // Include the item count
          _id: 0, // Exclude the _id field
        },
      },
    ])
    .toArray();

  if (categoryStats.length === 0) {
    throw new ApiError(400, "No transactions found for this month");
  }
  return res.status(200).json(
    new ApiResponse(200, "Statistics fetched successfully", {
      categoryStats,
    })
  );
});

const getCombinedData = asyncHandler(async (req, res) => {
  const { month = "" } = req.query; // Use req.query for the month parameter
  if (!month) {
    throw new ApiError(400, "Month is required");
  }

  try {
    const baseURL = `${req.protocol}://${req.get("host")}/api`;

    // Pass the query parameter to the internal API calls
    const [statisticsResponse, barChartDataResponse, pieChartDataResponse] =
      await Promise.all([
        axios.get(`${baseURL}/statistics`, { params: { month } }),
        axios.get(`${baseURL}/bar-chart-data`, { params: { month } }),
        axios.get(`${baseURL}/pie-chart-data`, { params: { month } }),
      ]);

    const combinedData = {
      statistics: statisticsResponse.data.data,
      barChartData: barChartDataResponse.data.data,
      pieChartData: pieChartDataResponse.data.data,
    };

    res
      .status(200)
      .json(
        new ApiResponse(200, "Combined data fetched successfully", combinedData)
      );
  } catch (error) {
    console.error("Error fetching combined data:", error.message);
    throw new ApiError(500, "Failed to fetch data from one or more APIs.");
  }
});

export {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
