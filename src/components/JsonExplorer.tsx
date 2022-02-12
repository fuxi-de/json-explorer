import React, { FunctionComponent } from "react";

type JsonExplorerProps = {
  input: Record<string, any>;
  onKeySelected: Function;
};

const JsonExplorer: FunctionComponent<JsonExplorerProps> = ({
  input,
  onKeySelected,
}) => {
  const isPrimitiveJsonValue = (value: any) => typeof value !== "object";

  const indentation = "  ";

  const printScope = (scope: string[]) => {
    onKeySelected(scope.join("."));
  };

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
    return (
      <div key={key}>
        <span onClick={() => printScope(currentScope)}>
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
    if (value?.constructor.name === "Array") {
      return (
        <div key={key}>
          <span onClick={() => printScope(currentScope)}>
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
    } else {
      return (
        <div key={key}>
          <span onClick={() => printScope(currentScope)}>
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
