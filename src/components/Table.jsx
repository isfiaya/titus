import { useActions, useValues } from "kea";
import React, { useEffect, useState } from "react";
import expensesLogic from "../logic/expensesLogic";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { createPortal } from "react-dom";
import EditExpenseModal from "./EditExpenseModal";

const modalRoot = document.getElementById("modal-root");

function Table({ pageSize = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { expenses } = useValues(expensesLogic);
  const { setSelectedExpenseId, loadExpenses } = useActions(expensesLogic);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = expenses.slice(startIndex, endIndex);
  const [deleteModelOpen, setDeleteModalOpen] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleModalEditExpense = async (id) => {
    toggleModalEdit();
    setSelectedExpenseId(id);
  };
  const handleModalDeletExpense = async (id) => {
    setDeleteModalOpen(true);
    setSelectedExpenseId(id);
  };
  const toggleModalDelete = () => {
    setDeleteModalOpen(!deleteModelOpen);
    console.log("deleteModelOpen", deleteModelOpen);
  };
  const toggleModalEdit = () => {
    setEditModelOpen(!editModelOpen);
  };
  const pageCount = Math.ceil(expenses.length / pageSize);
  const columns = [
    { key: "claimer_name", label: "Claimer" },
    { key: "expense_date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount (EUR)" },
  ];
  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="flex flex-col mb-8">
      <div className=" overflow-x-auto lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {expenses.length ? (
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
                          className="btn-primary mr-2 ml-auto "
                          onClick={() => handleModalEditExpense(row.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleModalDeletExpense(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <p className="text-base text-gray-500">No expense to show</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`w-8 h-8 text-sm mr-2 rounded-full ${
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
      {deleteModelOpen &&
        createPortal(
          <DeleteExpenseModal toggleModalDelete={toggleModalDelete} />,
          modalRoot
        )}
      {editModelOpen &&
        createPortal(
          <EditExpenseModal toggleModalEdit={toggleModalEdit} />,
          modalRoot
        )}
    </div>
  );
}

export default Table;
