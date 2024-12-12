export function extractPageText(): string {
    const elements = document.body.querySelectorAll("*:not(script):not(style)");
    let text = "";
    elements.forEach((el) => {
      if (el.textContent) text += " " + el.textContent.trim();
    });
    return text;
  }
  