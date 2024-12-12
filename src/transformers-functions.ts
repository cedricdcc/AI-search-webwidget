import { pipeline } from "@huggingface/transformers";

let qaPipeline: any;

export async function initializeModel(): Promise<void> {
  if (!qaPipeline) {
    try {
      qaPipeline = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad', {
        device: 'webgpu',
      });
    } catch (error) {
      console.error("Error initializing model", error);
      qaPipeline = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
    }
  }
}

export async function answerQuestion(question: string, context: string): Promise<string> {
  if (!qaPipeline) throw new Error("Model not initialized. Call initializeModel first.");

  // Ensure question and context are strings
  if (typeof question !== 'string' || typeof context !== 'string') {
    throw new TypeError("Both question and context must be strings.");
  }

  console.log("Answering question:", question);
  console.log("Context:", context);

  // Log the type of context
  console.log("Type of context:", typeof context);
  console.log(pipeline);
  const result = await qaPipeline(
    question,
    context,
  );
  return result.answer;
}
