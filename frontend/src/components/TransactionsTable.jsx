import React from "react";

const TransactionsTable = ({
  data,
  page,
  setPage,
  perPage,
  setPerPage,
  total,
}) => {
  const totalPages = Math.ceil(total / perPage); // Calculate the total number of pages

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      {/* Table */}
      {data.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {data.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.title}</td>
                <td>{txn.description}</td>
                <td>{txn.price}</td>
                <td>{txn.sold ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Page Number */}
        <p>
          Page {page} of {totalPages}
        </p>

        {/* Items Per Page Dropdown */}
        <select
          value={perPage}
          onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
          style={{ padding: "5px" }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>

        {/* Next and Previous Buttons */}
        <div>
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: page === 1 ? "#ccc" : "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            style={{
              padding: "5px 10px",
              backgroundColor: page === totalPages ? "#ccc" : "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: page === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
