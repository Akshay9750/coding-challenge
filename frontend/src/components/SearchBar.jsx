import React from "react";

const SearchBar = ({ month, setMonth, searchTerm, setSearchTerm }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search transactions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", flex: 1 }}
      />

      {/* Month Dropdown */}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ padding: "10px" }}
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
