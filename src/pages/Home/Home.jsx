import { useState, lazy, Suspense } from "react";
import EditExpenseModal from "../../components/EditExpenseModal";
import expensesLogic from "../../logic/expensesLogic";
import { useActions } from "kea";
import Spinner from "../../components/shared/Spinner";
// import Table from "../../components/Table";
// import Spinner from "../../components/shared/Spinner";
const Table = lazy(() => import("../../components/Table"));

const Home = () => {
  const { saveExpense } = useActions(expensesLogic);
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
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3500);
      } catch (err) {
        console.log("error in form add expenses", err);
      } finally {
        setIsLoading(false);
        setFormValues({
          claimer_name: "",
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

    setFormErrors((prevErrors) => {
      // Create a new object with all the previous errors except for the current input field
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-6xl mx-auto pt-8 px-4 ">
      {showAlert && (
        <div className="rounded-md bg-[#C4F9E2] p-4 absolute bottom-12 left-4 animate-[wiggle_2s_ease-in-out]">
          <p className="flex items-center text-sm font-medium text-[#004434]">
            Your expense has been added successfully
          </p>
        </div>
      )}

      <form
        className="bg-white shadow rounded px-8 pt-2 pb-2 mb-4 "
        onSubmit={handleSubmit}
      >
        <div className="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Claimer name
            </label>
            <select
              name="claimer_name"
              className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                formErrors.claimer_name ? "border-red-500" : ""
              }`}
              value={formValues.claimer_name}
              onChange={handleFormChange}
            >
              <option></option>
              <option>Employee A</option>
              <option>Employee B</option>
              <option>Employee C</option>
            </select>
            {formErrors.claimer_name && (
              <p className="text-red-500">{formErrors.claimer_name}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Date of expense
            </label>
            <input
              type="date"
              name="expense_date"
              className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
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
            <label className="block font-medium text-gray-700 text-sm">
              Description
            </label>
            <input
              type="text"
              name="description"
              className={`  bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${
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
            <label className="block font-medium text-gray-700 text-sm">
              Amount (EUR)
            </label>
            <input
              type="number"
              name="amount"
              className={`bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
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
            <label className="block font-medium text-gray-700 text-sm">
              Approved
            </label>
          </div>

          <div className="sm:flex sm:items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4  py-2 rounded hover:bg-blue-600 sm:ml-auto  font-medium text-sm "
            >
              {isLoading ? "loading..." : "Add expense"}
            </button>
          </div>
        </div>
      </form>
      <Suspense fallback={<Spinner />}>
        <Table />
      </Suspense>
    </div>
  );
};

export default Home;
