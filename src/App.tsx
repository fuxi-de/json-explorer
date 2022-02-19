import React, { ChangeEvent, useEffect, useState } from "react";
import JsonExplorer, { JsonProperty } from "./components/JsonExplorer";
import { Input } from "postcss";

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

  const [jsonProperty, setJsonProperty] = useState(initialState);
  const { scope, value } = jsonProperty;

  const [jsonCache, setJsonCache] = useState(new Map<string, string>());
  const [query, setQuery] = useState("");

  const handleChange = (query: string) => {
    console.log(query);
    const cacheHit = jsonCache.get(query);
    if (cacheHit) {
      console.log("Cache hit!", cacheHit);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => handleChange(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className="App p-8">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="selected"
          type="text"
          placeholder="Select a JSON Key"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <label
          className="block text-gray-700 text-sm font-bold mt-2"
          htmlFor="selected"
        >
          {`${value}`}
        </label>
      </div>

      <JsonExplorer
        input={testInput}
        onKeySelected={setJsonProperty}
        onCacheFilled={setJsonCache}
      />
    </div>
  );
}

export default App;
