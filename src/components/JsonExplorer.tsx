import React, { FunctionComponent } from "react";

type nestedDemoData = {
  id: string;
  prop: string;
  value: string;
  hasError: boolean;
};

type DemoData = {
  date: string;
  hasError: boolean;
  fields: nestedDemoData[];
};

type JsonExplorerProps = {
  input: DemoData;
  onKeySelected: (jsonProperty: JsonProperty) => void;
};

export type JsonProperty = {
  scope: string;
  value: {};
};

const JsonExplorer: FunctionComponent<JsonExplorerProps> = ({
  input,
  onKeySelected,
}) => {
  const isPrimitiveJsonValue = (value: any) => typeof value !== "object";

  const indentation = "  ";

  const traverseJsonAndDelegateRendering = (
    object: Record<string, any>,
    scope: string[] = []
  ): JSX.Element => {
    const renderableJson = Object.entries(object).map(([key, value]) => {
      if (isPrimitiveJsonValue(value)) {
        return renderPrimitiveType(key, value, scope);
      } else {
        return renderArray(key, value, scope);
      }
    });
    const key = scope.join(".");
    return (
      <div key={key}>
        <span>{`${indentation.repeat(scope.length)}{`}</span>
        {renderableJson}
        <span>{`${indentation.repeat(scope.length)}}`}</span>
      </div>
    );
  };

  const renderPrimitiveType = (
    key: string,
    value: any,
    scope: string[]
  ): JSX.Element => {
    const currentScope = [...scope, key];
    const currentIndentation = `${indentation.repeat(currentScope.length)}`;
    const jsonProperty: JsonProperty = {
      scope: currentScope.join("."),
      value,
    };
    return (
      <div key={key}>
        <span
          className={"text-blue-900 cursor-pointer"}
          onClick={() => onKeySelected(jsonProperty)}
        >
          {`${currentIndentation}"${key}"`}:{" "}
        </span>
        <span>{JSON.stringify(value)},</span>
      </div>
    );
  };

  const renderArray = (
    key: string,
    value: any,
    scope: string[]
  ): JSX.Element => {
    const currentScope = [...scope, key];
    const currentIndentation = `${indentation.repeat(currentScope.length)}`;
    const currentJsonProperty: JsonProperty = {
      scope: currentScope.join("."),
      value: JSON.stringify(value),
    };
    return (
      <div key={key}>
        <span
          className={"text-blue-900 cursor-pointer"}
          onClick={() => onKeySelected(currentJsonProperty)}
        >
          {`${currentIndentation}"${key}"`}:{" "}
        </span>
        <span>[</span>
        {value.map((value: any, index: number) => {
          const nestedScope = [...scope, key, `[${index}]`];
          return traverseJsonAndDelegateRendering(value, nestedScope);
        })}
        <span>{`${currentIndentation}],`}</span>
      </div>
    );
  };

  return <pre>{traverseJsonAndDelegateRendering(input)}</pre>;
};
export default JsonExplorer;
