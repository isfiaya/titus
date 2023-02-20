import { useActions } from "kea";
import { useState } from "react";
import expensesLogic from "../logic/expensesLogic";
import ConfirmationModal from "./ConfirmationModal";

const TableExpenses = ({
  toggleModal,
  expenses,
  deleteExpense,
  loadExpenses,
}) => {
  const { setSelectedExpenseId } = useActions(expensesLogic);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleDeleteExpense = async (id) => {
    deleteExpense(id), loadExpenses();
    setDeleteConfirmationOpen(false);
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
  return (
    <>
      <table className="table-auto w-full mb-12 max-w-6xl mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Claimer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount (EUR)</th>
            <th className="px-4 py-2">Approved</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense) => (
            <tr key={expense.id}>
              <td className="border px-4 py-2">{expense.claimer_name}</td>
              <td className="border px-4 py-2">{expense.expense_date}</td>
              <td className="border px-4 py-2">{expense.description}</td>
              <td className="border px-4 py-2">{expense.amount}</td>
              <td className="border px-4 py-2">
                {expense.approved ? "Yes" : "No"}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleModalEditExpense(expense.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleModalDeletExpense(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteConfirmationOpen && (
        <ConfirmationModal toggleModalDelete={toggleModalDelete} />
      )}
    </>
  );
};

export default TableExpenses;
