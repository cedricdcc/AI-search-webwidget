import React, { useState } from "react";
import { answerQuestion, initializeModel } from "./transformers-functions";

export const QAWidget: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskQuestion = async () => {
    const context = document.body.innerText; // Crawled text
    const modelAnswer = await answerQuestion(question, context);
    setAnswer(modelAnswer);
  };

  React.useEffect(() => {
    initializeModel();
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
      <h3>Ask a Question</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleAskQuestion} style={{ width: "100%" }}>
        Ask
      </button>
      {answer && (
        <div style={{ marginTop: "10px" }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
