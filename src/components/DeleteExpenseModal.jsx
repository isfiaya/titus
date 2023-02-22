import { useActions, useValues } from "kea";
import { useState } from "react";
import expensesLogic from "../logic/expensesLogic";
import Modal from "./shared/Modal";
import SuccessMessage from "./shared/SuccessMessage";

const DeleteExpenseModal = ({ toggleModalDelete }) => {
  const { deleteExpense } = useActions(expensesLogic);
  const { selectedExpense } = useValues(expensesLogic);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const handleDeleteExpense = () => {
    setDeletedSuccessfully(true);
    deleteExpense(selectedExpense.id);
  };

  return (
    <Modal toggleModal={toggleModalDelete}>
      {deletedSuccessfully ? (
        <SuccessMessage toggleModal={toggleModalDelete} />
      ) : (
        <>
          <div>
            <div className="text-center ">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
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
              className="btn-danger w-full "
              onClick={handleDeleteExpense}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn-secondary w-full mt-3 "
              onClick={toggleModalDelete}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeleteExpenseModal;
