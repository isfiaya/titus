import { useState, lazy, Suspense } from "react";
import expensesLogic from "../../logic/expensesLogic";
import { useActions } from "kea";
import Spinner from "../../components/shared/Spinner";
import Alert from "../../components/shared/Alert";
import Form from "../../components/forms/Form";
import fields from "../../constants/fields";
const Table = lazy(() => import("../../components/tables/Table"));

const Home = () => {
  const { saveExpense } = useActions(expensesLogic);
  const [showAlert, setShowAlert] = useState(false);

  const handelSaveExpense = (formValues) => {
    saveExpense(formValues);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3500);
  };
  return (
    <div className="max-w-6xl mx-auto pt-8 px-4 ">
      <Form
        fields={fields}
        submitFunction={handelSaveExpense}
        submitButtonLabel={"Add expense"}
      />

      <Suspense fallback={<Spinner />}>
        <Table />
      </Suspense>
      {showAlert && <Alert />}
    </div>
  );
};

export default Home;
