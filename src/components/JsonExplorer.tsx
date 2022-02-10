import React, { FunctionComponent } from "react";

type JsonExplorerProps = {
  input: Record<string, any>;
  onKeyClicked: Function;
};

const JsonExplorer: FunctionComponent<JsonExplorerProps> = ({
  input,
  onKeyClicked,
}) => {
  const isPrimitiveJsonValue = (value: any) => typeof value !== "object";
  const printScope = (scope: string) => {
    console.log(scope);
    onKeyClicked(scope);
  };

  const traverseJsonAndDelegateRendering = (
    object: Record<string, any>,
    scope = "root"
  ): JSX.Element => {
    const renderableJson = Object.entries(object).map(([key, value]) => {
      if (isPrimitiveJsonValue(value)) {
        return renderPrimitiveType(key, value, scope);
      } else {
        return renderReferenceType(key, value, scope);
      }
    });
    return (
      <div>
        <span>{"{"}</span>
        {renderableJson}
        <span>{"}"}</span>
      </div>
    );
  };

  const renderPrimitiveType = (
    key: string,
    value: any,
    scope: string
  ): JSX.Element => {
    const currentScope = `${scope}.${key}`;
    return (
      <div key={key}>
        <span onClick={() => printScope(currentScope)}>{`"${key}"`}: </span>
        <span>{JSON.stringify(value)},</span>
      </div>
    );
  };

  const renderReferenceType = (
    key: string,
    value: any,
    scope: string
  ): JSX.Element => {
    if (value?.constructor.name === "Array") {
      return value.map((value: any, index: number) => {
        const currentScope = `${scope}.${key}.[${index}]`;
        return (
          <div key={key}>
            <span onClick={() => printScope(currentScope)}>{`"${key}"`}: </span>
            <span>[</span>
            {traverseJsonAndDelegateRendering(value, currentScope)}
            <span>],</span>
          </div>
        );
      });
    } else {
      const currentScope = `${scope}.${key}`;
      return (
        <div key={key}>
          <span onClick={() => printScope(currentScope)}>{`"${key}"`}: </span>
          <span>{"{"}</span>
          {traverseJsonAndDelegateRendering(value, currentScope)}
          <span>{"},"}</span>
        </div>
      );
    }
  };

  return traverseJsonAndDelegateRendering(input);
};
export default JsonExplorer;
