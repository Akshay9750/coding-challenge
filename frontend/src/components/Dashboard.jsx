import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import TransactionsTable from "./TransactionsTable";
import StatisticsCard from "./StatisticsCard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [month, setMonth] = useState("Mar");
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch transactions table data
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("/api/transactions", {
          params: { month, search: searchTerm, page, perPage },
        });
        setTableData(response.data.data.transactions);
        setTotal(response.data.data.total); // Update total records for pagination
      } catch (error) {
        console.error("Error fetching transactions data:", error.message);
      }
    };

    fetchTableData();
  }, [month, searchTerm, page, perPage]);

  // Fetch combined API data for statistics, bar chart, and pie chart
  useEffect(() => {
    const fetchCombinedData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/combined-data", {
          params: { month },
        });
        const data = response.data.data;

        setStatistics(data.statistics);
        setBarChartData(data.barChartData);
        setPieChartData(data.pieChartData);
      } catch (error) {
        console.error("Error fetching combined data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedData();
  }, [month]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Transactions Dashboard
      </h1>
      <SearchBar
        month={month}
        setMonth={setMonth}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <TransactionsTable
          data={tableData}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          total={total}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Statistics for {month}</h3>
        <StatisticsCard data={statistics} />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">
          Loading statistics, bar chart, and pie chart...
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-between">
            <BarChart data={barChartData} />
            <PieChart data={pieChartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
