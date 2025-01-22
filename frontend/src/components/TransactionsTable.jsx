import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const TransactionsTable = ({
  data,
  page,
  setPage,
  perPage,
  setPerPage,
  total,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const totalPages = Math.ceil(total / perPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-screen-sm truncate">
                    {txn.title}
                  </td>
                  <td className="px-6 py-4">
                    <Tooltip
                      title={
                        <span style={{ whiteSpace: "pre-line" }}>
                          {txn.description}
                        </span>
                      }
                      arrow
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            maxWidth: "300px", // Adjust width dynamically
                            fontSize: "0.875rem",
                            backgroundColor: "#333",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <div className="text-sm text-gray-900 max-w-xs truncate cursor-pointer">
                        {txn.description}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Number(txn.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {txn.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        txn.sold
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {txn.sold ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden cursor-pointer">
                      <img
                        src={txn.image}
                        alt={txn.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
                        onClick={() => openModal(txn.image)} // Open modal on click
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions found.
          </div>
        )}
      </div>

      {/* Modal for Large Image */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <select
            value={perPage}
            onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
            className="block w-32 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
