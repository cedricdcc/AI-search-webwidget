Inspired by dyte.io I want to create a webwidget that has the capabilities to gather context from the domain it is on. This context will either be the text that is displayed on the pages from the site or the linked data it can find on the site.
This data can then be querried by an end-user to answer questions about the page.

The tech used in this site will be @huggingface/transformers

Step by step plan to execute:

### **High-Level Plan**
1. **Set Up Environment**
   - Install `transformers.js` and set up a development environment with TypeScript.
2. **Create the Widget**
   - Design an interactive UI for the widget.
3. **Webpage Crawling**
   - Crawl the main webpage and load the relevant data (e.g., text content).
4. **Load Domain Pages**
   - Fetch additional pages from the same domain for broader context.
5. **Integrate `transformers.js`**
   - Use a pre-trained language model for question answering.
6. **Build and Deploy**
   - Ensure performance optimizations, bundle the widget, and deploy it.

---

### **Step-by-Step Guide**

#### 1. **Set Up Environment**
   - Install the required dependencies:
     ```bash
     npm init -y
     npm install @huggingface/transformers --save
     npm install typescript webpack webpack-cli ts-loader --save-dev
     ```
   - Initialize a TypeScript project:
     ```bash
     npx tsc --init
     ```
   - Configure `webpack.config.js` to bundle the widget.

#### 2. **Widget Design**
   - Create a simple HTML container for your widget:
     ```html
     <div id="qa-widget"></div>
     ```
   - Add a TypeScript file (e.g., `widget.ts`) to render the widget's UI dynamically. Use a library like `lit-html` or plain DOM methods to handle this.

#### 3. **Crawling the Main Webpage**
   - Use DOM methods to extract text content:
     ```typescript
     function extractPageText(): string {
       const elements = document.body.querySelectorAll("*:not(script):not(style)");
       let text = "";
       elements.forEach((el) => {
         if (el.textContent) text += " " + el.textContent.trim();
       });
       return text;
     }
     ```
   - Store the extracted text in a variable for later use.

#### 4. **Load Domain Pages**
   - Use the Fetch API to retrieve pages from the domain:
     ```typescript
     async function fetchDomainPages(): Promise<string[]> {
       const response = await fetch("/sitemap.xml");
       if (response.ok) {
         const sitemap = await response.text();
         const parser = new DOMParser();
         const xmlDoc = parser.parseFromString(sitemap, "text/xml");
         const urls = Array.from(xmlDoc.querySelectorAll("url > loc")).map(
           (el) => el.textContent || ""
         );
         const pageContents = await Promise.all(
           urls.map(async (url) => {
             const res = await fetch(url);
             return res.ok ? await res.text() : "";
           })
         );
         return pageContents;
       } else {
         console.error("Failed to load sitemap.");
         return [];
       }
     }
     ```

#### 5. **Integrate `transformers.js`**
   - Load a pre-trained model, such as `distilbert-base-uncased-distilled-squad` for question answering:
     ```typescript
     import { pipeline } from "@huggingface/transformers";

     async function initializeModel() {
       const questionAnswering = await pipeline("question-answering");
       return questionAnswering;
     }

     async function answerQuestion(
       question: string,
       context: string
     ): Promise<string> {
       const qa = await initializeModel();
       const result = await qa({
         question,
         context,
       });
       return result.answer;
     }
     ```
   - Combine the crawled webpage text and fetched pages as the model's context.

#### 6. **Widget Interaction**
   - Add input fields and buttons for user interaction:
     ```typescript
     const widgetContainer = document.getElementById("qa-widget");
     widgetContainer.innerHTML = `
       <input type="text" id="question" placeholder="Ask a question..." />
       <button id="ask-btn">Ask</button>
       <div id="answer"></div>
     `;

     document.getElementById("ask-btn")?.addEventListener("click", async () => {
       const question = (
         document.getElementById("question") as HTMLInputElement
       ).value;
       const context = extractPageText(); // or combine with fetched pages
       const answer = await answerQuestion(question, context);
       document.getElementById("answer").innerText = answer;
     });
     ```

#### 7. **Build and Deploy**
   - Use Webpack to bundle your widget:
     ```javascript
     // webpack.config.js
     const path = require("path");

     module.exports = {
       entry: "./src/widget.ts",
       output: {
         filename: "widget.bundle.js",
         path: path.resolve(__dirname, "dist"),
       },
       resolve: {
         extensions: [".ts", ".js"],
       },
       module: {
         rules: [
           {
             test: /\.ts$/,
             use: "ts-loader",
             exclude: /node_modules/,
           },
         ],
       },
       mode: "production",
     };
     ```
   - Deploy the bundled JavaScript (`widget.bundle.js`) to your server.

---

### **Important Considerations**
1. **CORS Issues**:
   - Ensure the server hosting the sitemap and pages allows cross-origin requests.
2. **Performance**:
   - Large contexts may slow down the model. Consider summarizing or chunking text.
3. **Security**:
   - Validate user inputs to prevent malicious injections.
4. **Caching**:
   - Cache the loaded pages to avoid repeated fetches.
5. **Legal Compliance**:
   - Check if crawling and loading domain pages aligns with the website's terms of service.
