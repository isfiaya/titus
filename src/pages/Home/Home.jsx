import { useEffect, useState } from "react";
import EditExpenseModal from "../../components/EditExpenseModal";
import TableExpenses from "../../components/TableExpenses";
import expensesLogic from "../../logic/expensesLogic";
import { useActions, useValues } from "kea";

const Home = () => {
  const { expenses } = useValues(expensesLogic);
  const { saveExpense, loadExpenses, deleteExpense } =
    useActions(expensesLogic);
  const [showAlert, setShowAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formValues, setFormValues] = useState({
    claimer_name: "",
    expense_date: "",
    description: "",
    amount: 0,
    approved: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);

        saveExpense(formValues);
        loadExpenses();
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } catch (err) {
        console.log("error in form add expenses", err);
      } finally {
        setIsLoading(false);
        setFormValues({
          claimer_name: "Employee A",
          expense_date: "",
          description: "",
          amount: 0,
          approved: false,
        });
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    // clear errors when user starts typing
    // setFormErrors({});

    setFormErrors((prevErrors) => {
      // Create a new object with all the previous errors except for the current input field
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    loadExpenses();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      {showAlert && (
        <div className="rounded-md bg-[#C4F9E2] p-4 absolute bottom-12 left-4 animate-[wiggle_2s_ease-in-out]">
          <p className="flex items-center text-sm font-medium text-[#004434]">
            Your expense has been added successfully
          </p>
        </div>
      )}

      <form
        className="bg-white shadow-md rounded px-8 pt-2 pb-2 mb-4 mt-4"
        onSubmit={handleSubmit}
      >
        <div className="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700">
              Claimer name
            </label>
            <select
              name="claimer_name"
              className={`block w-full p-2 border rounded ${
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
              <p className="text-red-500">{formErrors.claimer_name}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Date of expense
            </label>
            <input
              type="date"
              name="expense_date"
              className={`block w-full p-2 border rounded ${
                formErrors.expense_date ? "border-red-500" : ""
              }`}
              value={formValues.expense_date}
              onChange={handleFormChange}
            />
            {formErrors.expense_date && (
              <p className="text-red-500">{formErrors.expense_date}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              className={` block w-full p-2 border rounded  ${
                formErrors.description ? "border-red-500" : ""
              }`}
              value={formValues.description}
              onChange={handleFormChange}
            />
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Amount (EUR)
            </label>
            <input
              type="number"
              name="amount"
              className={`block w-full p-2 border rounded ${
                formErrors.amount ? "border-red-500" : ""
              }`}
              value={formValues.amount}
              onChange={handleFormChange}
            />
            {formErrors.amount && (
              <p className="text-red-500">{formErrors.amount}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="approved"
              className="inline-block mr-2"
              checked={formValues.approved}
              onChange={handleFormChange}
            />
            <label className="block font-medium text-gray-700">Approved</label>
          </div>

          <div className="sm:flex sm:items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 sm:ml-auto"
            >
              {isLoading ? "loading..." : "Add expense"}
            </button>
          </div>
        </div>
      </form>

      <TableExpenses
        toggleModal={toggleModal}
        expenses={expenses}
        deleteExpense={deleteExpense}
        loadExpenses={loadExpenses}
      />
      {isOpen && <EditExpenseModal toggleModal={toggleModal} />}
    </div>
  );
};

export default Home;
