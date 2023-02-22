import { useState, lazy, Suspense } from "react";
import expensesLogic from "../../logic/expensesLogic";
import { useActions } from "kea";
import Spinner from "../../components/shared/Spinner";
import Alert from "../../components/shared/Alert";
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

  return (
    <div className="max-w-6xl mx-auto pt-8 px-4 ">
      <form
        className="bg-white shadow rounded px-8 pt-2 pb-2 mb-4 "
        onSubmit={handleSubmit}
      >
        <div className="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="form-label">Claimer name</label>
            <select
              name="claimer_name"
              className={`form-input ${
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
              <p className="text-red-500">{formErrors.expense_date}</p>
            )}
          </div>
          <div>
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className={`  form-input  ${
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
            <label className="form-label">Amount (EUR)</label>
            <input
              type="number"
              name="amount"
              className={`form-input${
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
            <label className="form-label">Approved</label>
          </div>

          <div className="sm:flex sm:items-center">
            <button type="submit" className="sm:ml-auto btn-primary ">
              {isLoading ? "loading..." : "Add expense"}
            </button>
          </div>
        </div>
      </form>
      <Suspense fallback={<Spinner />}>
        <Table />
      </Suspense>
      {showAlert && <Alert />}
    </div>
  );
};

export default Home;
