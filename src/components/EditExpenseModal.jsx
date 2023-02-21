import { useActions, useValues } from "kea";
import { useState } from "react";
import expensesLogic from "../logic/expensesLogic";

const EditExpenseModal = ({ expense, toggleModal }) => {
  const { updateExpense, loadExpenses } = useActions(expensesLogic);
  const { selectedExpense } = useValues(expensesLogic);
  const [formErrors, setFormErrors] = useState({});
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);

  const validateForm = () => {
    const errors = {};

    // Validate claimer name
    if (!formValues.claimer_name) {
      errors.claimer_name = "Claimer name is required";
    }

    // Validate expense date
    if (!formValues.expense_date) {
      errors.expense_date = "Date of expense is required";
    }

    // Validate description
    if (!formValues.description) {
      errors.description = "Description is required";
    }

    // Validate amount
    if (!formValues.amount) {
      errors.amount = "Amount is required";
      console.log("ruub");
    } else if (isNaN(formValues.amount)) {
      errors.amount = "Amount must be a number";
    } else if (Number(formValues.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
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
    setFormErrors((prevErrors) => {
      // Create a new object with all the previous errors except for the current input field
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateExpense(formValues);
      setUpdatedSuccessfully(true);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={toggleModal}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
          {updatedSuccessfully ? (
            <>
              <div className="text-center ">
                <p className="text-base text-gray-500">
                  Expense updated successfully
                </p>

                <button
                  type="button"
                  className="mt-3 w-full  rounded border border-gray-300  px-4 py-2 bg-white  font-medium text-gray-700 hover:bg-gray-50  text-sm"
                  onClick={toggleModal}
                >
                  ok
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-3  sm:mt-0 sm:ml-4 text-left">
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
                      <label className="block font-medium text-gray-700 text-sm">
                        Claimer name
                      </label>
                      <select
                        name="claimer_name"
                        className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                          formErrors.claimer_name ? "border-red-500" : ""
                        }`}
                        value={formValues.claimer_name}
                        onChange={handleFormChange}
                      >
                        <option>Employee A</option>
                        <option>Employee B</option>
                        <option>Employee C</option>
                      </select>
                      {formErrors.claimer_name && (
                        <p className="text-red-500">
                          {formErrors.claimer_name}
                        </p>
                      )}
                    </div>
                    <div className="my-4">
                      <label className="block font-medium text-gray-700 text-sm">
                        Date of expense
                      </label>
                      <input
                        type="date"
                        name="expense_date"
                        className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                          formErrors.expense_date ? "border-red-500" : ""
                        }`}
                        value={formValues.expense_date}
                        onChange={handleFormChange}
                      />
                      {formErrors.expense_date && (
                        <p className="text-red-500">
                          {formErrors.expense_date}
                        </p>
                      )}
                    </div>
                    <div className="my-4">
                      <label className="block font-medium text-gray-700 text-sm">
                        Description
                      </label>
                      <input
                        name="description"
                        type="text"
                        className={` bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
                          formErrors.description ? "border-red-500" : ""
                        }`}
                        value={formValues.description}
                        onChange={handleFormChange}
                      />
                      {formErrors.description && (
                        <p className="text-red-500">{formErrors.description}</p>
                      )}
                    </div>
                    <div className="my-4">
                      <label className="block font-medium text-gray-700 text-sm">
                        Amount (EUR)
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleFormChange}
                        className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                          formErrors.amount ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.amount && (
                        <p className="text-red-500">{formErrors.amount}</p>
                      )}
                    </div>
                    <div className="my-4 flex items-center">
                      <input
                        type="checkbox"
                        name="approved"
                        className="inline-block mr-2"
                        checked={formValues.approved}
                        onChange={handleFormChange}
                      />
                      <label className="block font-medium text-gray-700 text-sm">
                        Approved
                      </label>
                    </div>
                    <div className="my-4 flex">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 font-medium text-sm "
                      >
                        Save
                      </button>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className=" rounded border border-gray-300  px-4 py-2 bg-white  font-medium text-gray-700 hover:text-gray-500 focus:outline-none  text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditExpenseModal;
