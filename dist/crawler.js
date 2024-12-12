"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPageText = extractPageText;
function extractPageText() {
    var elements = document.body.querySelectorAll("*:not(script):not(style)");
    var text = "";
    elements.forEach(function (el) {
        if (el.textContent)
            text += " " + el.textContent.trim();
    });
    return text;
}
