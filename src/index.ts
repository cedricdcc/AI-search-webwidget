import  { renderWidget } from "./widget";
import { initializeModel } from "./transformers-functions";

// when document is loaded then call renderWidget function
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
  initializeModel().then(() => console.log("Model initialized"));
  renderWidget("widget-container");
});
