import { useActions, useValues } from "kea";
import { useEffect, useState } from "react";
import expensesLogic from "../logic/expensesLogic";

function EditExpenseModal({ expense, toggleModal }) {
  const [claimerName, setClaimerName] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [approved, setApproved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const editedExpense = {
    //   id: expense.id,
    //   claimerName,
    //   expenseDate,
    //   description,
    //   amount,
    //   approved,
    // };
    // onSave(editedExpense);
  };
  const { selectedExpenseId, selectedExpense } = useValues(expensesLogic);

  useEffect(() => {
    // console.log("edit component", selectedExpenseId);
    console.log("selectedExpense", selectedExpense);
  });
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
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
                {/* Render form fields for editing expense */}
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Claimer name
                    </label>
                    <select
                      className="block w-full p-2 border rounded"
                      value={selectedExpense.claimerName}
                      onChange={(e) => setClaimerName(e.target.value)}
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
                      className="block w-full p-2 border rounded"
                      value={selectedExpense.expense_date}
                      onChange={(e) => setExpenseDate(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      className="block w-full p-2 border rounded"
                      value={selectedExpense.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Amount (EUR)
                    </label>
                    <input
                      type="number"
                      className="block w-full p-2 border rounded"
                      value={selectedExpense.amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="block font-medium text-gray-700">
                      Approved
                    </label>
                    <input
                      type="checkbox"
                      className="inline-block mr-2"
                      checked={selectedExpense.approved}
                      onChange={(e) => setApproved(e.target.checked)}
                    />
                  </div>
                  <div className="my-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              onClick={toggleModal}
            >
              Save
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default EditExpenseModal;
