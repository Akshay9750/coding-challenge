import React from "react";

const StatisticsCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 bg-white p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-700">
          {Number(data.totalSales).toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">Total Sales</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-700">{data.soldItems}</div>
        <div className="text-sm text-gray-500">Sold Items</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-gray-700">
          {data.notSoldItems}
        </div>
        <div className="text-sm text-gray-500">Unsold Items</div>
      </div>
    </div>
  );
};

export default StatisticsCard;
