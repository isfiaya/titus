import { useActions } from "kea";
import { useEffect } from "react";
import expensesLogic from "./logic/expensesLogic";
import RouterConfig from "./routing/RouterConfig";

function App() {
  const { loadExpenses } = useActions(expensesLogic);

  useEffect(() => {
    loadExpenses();
  }, []);
  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
