import React, { useState } from "react";
import JsonExplorer, { JsonProperty } from "./components/JsonExplorer";

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
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
    "string",
    5,
    false,
  ],
  anotherDate: "2021-10-27T07:49:14.896Z",
  bool: false,
  num: 5,
};

function App() {
  const initialState: JsonProperty = {
    scope: "",
    value: "",
  };

  const [path, setPath] = useState(initialState);
  const { scope, value } = path;
  return (
    <div className="App p-8">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="selected"
          type="text"
          placeholder="Select a JSON Key"
          readOnly
          value={scope}
        />
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="selected"
        >
          {`${value}`}
        </label>
      </div>

      <JsonExplorer input={testInput} onKeySelected={setPath} />
    </div>
  );
}

export default App;
