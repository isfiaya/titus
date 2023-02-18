import { useState } from "react";
import reactLogo from "./assets/react.svg";
import RouterConfig from "./routing/RouterConfig";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
