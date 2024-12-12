import { answerQuestion } from "./transformers-functions";
import { extractPageText } from "./crawler";

export function renderWidget(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container with ID ${containerId} not found.`);
    
    container.innerHTML = `
      <input type="text" id="question" placeholder="Ask a question..." />
      <button id="ask-btn">Ask</button>
      <div id="answer"></div>
    `;

    // update the document with the new widget
    
  
    document.getElementById("ask-btn")?.addEventListener("click", async () => {
      const question = (document.getElementById("question") as HTMLInputElement).value;
      const context = await extractPageText(); // Replace with actual context loading
      const answer = await answerQuestion(question, context); // Imported function
      const answerContainer = document.getElementById("answer");
      if (answerContainer) answerContainer.innerText = answer;
    });
  }
  