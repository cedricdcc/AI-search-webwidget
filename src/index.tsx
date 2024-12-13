import React from "react";
import { createRoot } from "react-dom/client";
import { QAWidget } from "./widget";

export function renderQAWidget(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with ID "${containerId}" not found.`);
  }
  const root = createRoot(container);
  root.render(<QAWidget />);
}

// Export the renderQAWidget function as QAWidget
export const QAWidgetGlobal = {
  renderQAWidget,
};

// When the document is loaded, call renderQAWidget function
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
  QAWidgetGlobal.renderQAWidget("qa-widget-container");
});