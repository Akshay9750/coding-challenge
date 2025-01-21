import React from "react";

const StatisticsCard = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>Total Sales: {data.totalSales}</div>
      <div>Sold Items: {data.soldItems}</div>
      <div>Unsold Items: {data.notSoldItems}</div>
    </div>
  );
};

export default StatisticsCard;
