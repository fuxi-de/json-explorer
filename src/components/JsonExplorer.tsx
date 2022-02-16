import React, { FunctionComponent } from "react";

type JsonExplorerProps = {
  input: Record<string, any>;
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
    scope: string[] = [],
    shouldRenderBrackets = true
  ): JSX.Element => {
    const renderableJson = Object.entries(object).map(([key, value]) => {
      if (isPrimitiveJsonValue(value)) {
        return renderPrimitiveType(key, value, scope);
      } else {
        return renderReferenceType(key, value, scope);
      }
    });
    const key = scope.join(".");
    return shouldRenderBrackets ? (
      <div key={key}>
        <span>{`${indentation.repeat(scope.length)}{`}</span>
        {renderableJson}
        <span>{`${indentation.repeat(scope.length)}}`}</span>
      </div>
    ) : (
      <div key={key}>{renderableJson}</div>
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

  const renderReferenceType = (
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
    if (value?.constructor.name === "Array") {
      return (
        <div key={key}>
          <span onClick={() => onKeySelected(currentJsonProperty)}>
            {`${currentIndentation}"${key}"`}:{" "}
          </span>
          <span>[</span>
          {value.map((value: any, index: number) => {
            const nestedScope = [...scope, key, `[${index}]`];
            if (isPrimitiveJsonValue(value)) {
              const nestedIndentation = `${currentIndentation.repeat(
                nestedScope.length
              )}`;
              return (
                <div key={nestedScope.join(".")}>
                  {`${nestedIndentation}${JSON.stringify(value)}`},
                </div>
              );
            }
            return traverseJsonAndDelegateRendering(value, nestedScope);
          })}
          <span>{`${currentIndentation}],`}</span>
        </div>
      );
    } else {
      return (
        <div key={key}>
          <span onClick={() => onKeySelected(currentJsonProperty)}>
            {`${currentIndentation}"${key}"`}:{" "}
          </span>
          <span>{"{"}</span>
          {traverseJsonAndDelegateRendering(value, currentScope, false)}
          <span>{`${currentIndentation}},`}</span>
        </div>
      );
    }
  };

  return <pre>{traverseJsonAndDelegateRendering(input)}</pre>;
};
export default JsonExplorer;
