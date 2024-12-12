import { pipeline } from "@huggingface/transformers";

let qaPipeline: any;

export async function initializeModel(): Promise<void> {
  if (!qaPipeline) {
    qaPipeline = await pipeline("question-answering");
  }
}

export async function answerQuestion(question: string, context: string): Promise<string> {
  if (!qaPipeline) throw new Error("Model not initialized. Call initializeModel first.");
  const result = await qaPipeline({
    question,
    context,
  });
  return result.answer;
}
