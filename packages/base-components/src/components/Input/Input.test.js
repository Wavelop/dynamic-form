// Link.react.test.js
import React from "react";
import Input from ".";
import renderer from "react-test-renderer";

describe("Input", () => {
  test("renders correctly", () => {
    const component = renderer.create(
      <Input
        id={"input-test-storybook"}
        name={"input-test-storybook"}
        htmlFor={"input-test-storybook"}
        type={"text"}
        inputLabel={"Input di prova di tipo TEXT"}
        showErrorOnInput={true}
        error={false}
        errorMessage={""}
        required={true}
        onBlur={() => {}}
        onChange={() => {}}
        value={null}
        placeholder={"Digita quello che vuoi, è una prova"}
        disabled={false}
        debug={false}
      ></Input>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
