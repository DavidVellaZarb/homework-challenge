import { render, unmountComponentAtNode } from "react-dom";
import React from "react";
import App from './App';
import { act } from "react-dom/test-utils";

jest.mock("./Topics", () => {
  return function DummyTopics(props) {
    return (
      <div data-testid="topics">
        {props.selectedTopics}
      </div>
    );
  };
});

jest.mock("./Paragraphs", () => {
  return function DummyTopics(props) {
    return (
      <div data-testid="paragraphs">
        {props.selectedTopics}
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.innerHTML).not.toBe(null);
});

it("Passes an empty list of selected topics to the Topics component at start", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.querySelector('[data-testid="topics"]').textContent).toEqual(
    ""
  );
});

it("Passes an empty list of selected topics to the Paragraphs component at start", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.querySelector('[data-testid="paragraphs"]').textContent).toEqual(
    ""
  );
});

it("Correctly passes selected topics to the Topics component", () => {
  act(() => {
    const root = render(<App />, container);
    root.setState({selectedTopics : ["E"]});
  });
  expect(container.querySelector('[data-testid="topics"]').textContent).toEqual(
    "E"
  );
});

it("Correctly passes selected topics to the Paragraphs component", () => {
  act(() => {
    const root = render(<App />, container);
    root.setState({selectedTopics : ["E"]});
  });
  expect(container.querySelector('[data-testid="paragraphs"]').textContent).toEqual(
    "E"
  );
});