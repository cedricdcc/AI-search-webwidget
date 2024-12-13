import React, { useState, useEffect } from "react";
import { answerQuestion, initializeModel } from "./transformers-functions";

export const QAWidget: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const handleAskQuestion = async () => {
    const context = document.body.innerText; // Crawled text
    const modelAnswer = await answerQuestion(question, context);
    setAnswer(modelAnswer);
  };

  useEffect(() => {
    const init = async () => {
      await initializeModel();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-gray-500 text-lg">Loading AI search...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "300px", opacity: loading ? 0.5 : 1 }}>
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
