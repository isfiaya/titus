import { useActions, useValues } from "kea";
import { useState } from "react";
import expensesLogic from "../logic/expensesLogic";

const EditExpenseModal = ({ expense, toggleModal }) => {
  const { updateExpense, loadExpenses } = useActions(expensesLogic);
  const { selectedExpense } = useValues(expensesLogic);

  const [formValues, setFormValues] = useState({
    claimer_name: selectedExpense.claimer_name,
    expense_date: selectedExpense.expense_date,
    description: selectedExpense.description,
    amount: selectedExpense.amount,
    approved: selectedExpense.approved,
    id: selectedExpense.id,
  });
  const handleFormChange = (e) => {
    console.log("runnn");
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    updateExpense(formValues);
    loadExpenses();
    toggleModal();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={toggleModal}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Edit Expense
              </h3>
              <div className="mt-2">
                <form
                  className="max-w-lg mx-auto"
                  onSubmit={handleUpdateExpense}
                >
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Claimer name
                    </label>
                    <select
                      name="claimer_name"
                      className="block w-full p-2 border rounded"
                      value={formValues.claimer_name}
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
                      name="expense_date"
                      className="block w-full p-2 border rounded"
                      value={formValues.expense_date}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Description
                    </label>
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
                    <label className="block font-medium text-gray-700">
                      Approved
                    </label>
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
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditExpenseModal;
