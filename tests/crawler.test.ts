import { extractPageText } from "../src/crawler";

describe("extractPageText", () => {
  test("should extract text from a simple DOM structure", () => {
    document.body.innerHTML = `
      <div>
        <h1>Title</h1>
        <p>Some content.</p>
      </div>
    `;
    const text = extractPageText();
    expect(text).toContain("Title");
    expect(text).toContain("Some content.");
  });
});
