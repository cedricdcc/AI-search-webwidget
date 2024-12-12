"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("./widget");
// when document is loaded then call renderWidget function
document.addEventListener("DOMContentLoaded", function () {
    console.log("Document loaded");
    (0, widget_1.renderWidget)("widget-container");
});
