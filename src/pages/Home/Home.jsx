import React, { useState } from "react";
import { supabase } from "../../supabase/init";
import EditExpenseModal from "../../components/EditExpenseModal";
import TableExpenses from "../../components/TableExpenses";
import expensesLogic from "../../logic/expensesLogic";
import { useActions } from "kea";

function Home() {
  const { saveExpense, loadExpenses } = useActions(expensesLogic);
  const [formValues, setFormValues] = useState({
    claimerName: "",
    expenseDate: "",
    description: "",
    amount: 0,
    approved: false,
  });

  // MODAL
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      claimer_name: formValues.claimerName,
      expense_date: formValues.expenseDate,
      description: formValues.description,
      amount: formValues.amount,
      approved: formValues.approved,
    };
    saveExpense(data);
    loadExpenses();
  }

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const handleSaveExpense = async (updatedExpense) => {
    let { data, error } = await supabase
      .from("expenses")
      .update(updatedExpense)
      .eq("id", selectedExpense.id);

    if (error) console.log("Error updating expense:", error.message);
    else {
      setExpenses(
        expenses.map((expense) =>
          expense.id === data[0].id ? { ...expense, ...data[0] } : expense
        )
      );
      setShowEditModal(false);
      setSelectedExpense(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setSelectedExpense(null);
  };
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };
  return (
    <div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Claimer name
          </label>
          <select
            name="claimerName"
            className="block w-full p-2 border rounded"
            value={formValues.claimerName}
            onChange={handleFormChange}
          >
            <option>Employee A</option>
            <option>Employee B</option>
            <option>Employee C</option>
          </select>
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Date of expense
          </label>
          <input
            type="date"
            name="expenseDate"
            className="block w-full p-2 border rounded"
            value={formValues.expenseDate}
            onChange={handleFormChange}
          />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            className="block w-full p-2 border rounded"
            value={formValues.description}
            onChange={handleFormChange}
          />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">
            Amount (EUR)
          </label>
          <input
            type="number"
            name="amount"
            className="block w-full p-2 border rounded"
            value={formValues.amount}
            onChange={handleFormChange}
          />
        </div>
        <div className="my-4">
          <label className="block font-medium text-gray-700">Approved</label>
          <input
            type="checkbox"
            name="approved"
            className="inline-block mr-2"
            checked={formValues.approved}
            onChange={handleFormChange}
          />
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add expense
          </button>
        </div>
      </form>
      <TableExpenses toggleModal={toggleModal} l />
      {isOpen && <EditExpenseModal toggleModal={toggleModal} />}
    </div>
  );
}

export default Home;
