import { useActions } from "kea";
import React, { useState } from "react";
import expensesLogic from "../logic/expensesLogic";
import ConfirmationModal from "./ConfirmationModal";

function Table({ data, columns, pageSize = 5, toggleModal }) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = data.slice(startIndex, endIndex);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { setSelectedExpenseId } = useActions(expensesLogic);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("run", page);
  };
  const handleModalEditExpense = async (id) => {
    toggleModal();
    console.log("id", id);
    setSelectedExpenseId(id);
  };
  const handleModalDeletExpense = async (id) => {
    setDeleteConfirmationOpen(true);
    setSelectedExpenseId(id);
  };
  const toggleModalDelete = () => {
    setDeleteConfirmationOpen(!deleteConfirmationOpen);
  };

  const pageCount = Math.ceil(data.length / pageSize);

  return (
    <div className="flex flex-col mb-8">
      <div className=" overflow-x-auto lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Approved
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageData.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {row[column.key]}
                      </td>
                    ))}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row["approved"] ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 flex">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-2 ml-auto font-medium text-sm "
                        onClick={() => handleModalEditExpense(row.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded font-medium text-sm"
                        onClick={() => handleModalDeletExpense(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 text-base mr-2 rounded-full ${
              i + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {deleteConfirmationOpen && (
        <ConfirmationModal toggleModalDelete={toggleModalDelete} />
      )}
    </div>
  );
}

export default Table;
