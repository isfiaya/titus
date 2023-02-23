import { useActions, useValues } from "kea";
import { useState } from "react";
import expensesLogic from "../../logic/expensesLogic";
import Modal from "../shared/Modal";
import SuccessMessage from "../shared/SuccessMessage";
import PropTypes from "prop-types";

const EditExpenseModal = ({ toggleModalEdit }) => {
  const { updateExpense } = useActions(expensesLogic);
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
    } else if (isNaN(formValues.amount)) {
      errors.amount = "Amount must be a number";
    } else if (Number(formValues.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const [formValues, setFormValues] = useState(selectedExpense);
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
    <Modal toggleModal={toggleModalEdit}>
      {updatedSuccessfully ? (
        <SuccessMessage
          toggleModal={toggleModalEdit}
          labelButton={"Expense updated successfully"}
        />
      ) : (
        <>
          <div className="mt-3  sm:mt-0 sm:ml-4 text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Expense
            </h3>
            <div className="mt-2">
              <form className="max-w-lg mx-auto" onSubmit={handleUpdateExpense}>
                <div className="my-4">
                  <label className="form-label">Claimer name</label>
                  <select
                    name="claimer_name"
                    className={`form-input ${
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
                    <p className="form-label text-red-500 font-normal">
                      {formErrors.claimer_name}
                    </p>
                  )}
                </div>
                <div className="my-4">
                  <label className="form-label">Date of expense</label>
                  <input
                    type="date"
                    name="expense_date"
                    className={`form-input${
                      formErrors.expense_date ? "border-red-500" : ""
                    }`}
                    value={formValues.expense_date}
                    onChange={handleFormChange}
                  />
                  {formErrors.expense_date && (
                    <p className="form-label text-red-500 font-normal">
                      {formErrors.expense_date}
                    </p>
                  )}
                </div>
                <div className="my-4">
                  <label className="form-label">Description</label>
                  <input
                    name="description"
                    type="text"
                    className={`form-input ${
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
                  <label className="form-label">Amount (EUR)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formValues.amount}
                    onChange={handleFormChange}
                    className={`form-input ${
                      formErrors.amount ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.amount && (
                    <p className="form-label text-red-500 font-normal">
                      {formErrors.amount}
                    </p>
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
                  <label className="form-label">Approved</label>
                </div>
                <div className="my-4 flex">
                  <button type="submit" className="btn-primary mr-2">
                    Save
                  </button>
                  <button
                    onClick={toggleModalEdit}
                    type="button"
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
EditExpenseModal.propTypes = {
  toggleModalEdit: PropTypes.func.isRequired,
};
export default EditExpenseModal;
