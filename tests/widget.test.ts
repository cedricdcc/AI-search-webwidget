import { renderWidget } from "../src/widget";

describe("Widget Rendering", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="qa-widget"></div>';
  });

  test("should render the widget", () => {
    renderWidget("qa-widget");
    expect(document.getElementById("question")).not.toBeNull();
    expect(document.getElementById("ask-btn")).not.toBeNull();
    expect(document.getElementById("answer")).not.toBeNull();
  });
});
