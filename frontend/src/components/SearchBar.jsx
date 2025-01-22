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
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search transactions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-2/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Month Dropdown */}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
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
