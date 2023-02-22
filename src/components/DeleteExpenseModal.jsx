import { useActions, useValues } from "kea";
import { useState } from "react";
import expensesLogic from "../logic/expensesLogic";

const DeleteExpenseModal = ({ toggleModalDelete }) => {
  const { deleteExpense } = useActions(expensesLogic);
  const { selectedExpense } = useValues(expensesLogic);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const handleDeleteExpense = () => {
    setDeletedSuccessfully(true);
    deleteExpense(selectedExpense.id);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={toggleModalDelete}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
          {deletedSuccessfully ? (
            <>
              <div className="text-center ">
                <p className="text-base text-gray-500">
                  Expense deleted successfully
                </p>

                <button
                  type="button"
                  className="mt-3 w-full  rounded border border-gray-300  px-4 py-2 bg-white  font-medium text-gray-700 hover:bg-gray-50  text-sm"
                  onClick={toggleModalDelete}
                >
                  ok
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-center ">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Delete Expense
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this expense?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  onClick={handleDeleteExpense}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={toggleModalDelete}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;