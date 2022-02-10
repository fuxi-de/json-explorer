import React, { useState } from "react";
import JsonExplorer from "./components/JsonExplorer";

const testInput = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  number: 5,
  iAmAnObject: {
    id: "4c212130",
    prop: "iban",
    value: "DE81200505501265402568",
    hasError: false,
  },
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
  ],
};

function App() {
  const [path, setPath] = useState("none given yet :)");
  return (
    <div className="App">
      <span>current path is: {path}</span>
      <JsonExplorer input={testInput} onKeyClicked={setPath} />
    </div>
  );
}

export default App;
