import React, { useState, useEffect } from "react";
import { answerQuestion, initializeModel } from "./transformers-functions";

export const QAWidget: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    if (!loading) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={loading}
        className={`border border-gray-300 p-2 w-72 ${loading ? "opacity-50" : "opacity-100"}`}
      >
        {loading ? "Loading AI search..." : "Ask a Question"}
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3 className="text-lg font-bold mb-2">Ask a Question</h3>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here"
              className="w-full mb-2 p-2 border border-gray-300"
            />
            <button onClick={handleAskQuestion} className="w-full p-2 bg-blue-500 text-white">
              Ask
            </button>
            {answer && (
              <div className="mt-2">
                <strong>Answer:</strong>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};