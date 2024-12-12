import { initializeModel, answerQuestion } from "../src/transformers-functions";

describe("Transformers Integration", () => {
  beforeAll(async () => {
    await initializeModel();
  });

  test("should answer questions correctly", async () => {
    const context = "Hugging Face is a company based in New York.";
    const question = "Where is Hugging Face based?";
    const answer = await answerQuestion(question, context);
    expect(answer).toBe("New York");
  });
});
