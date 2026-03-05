import agent from "../utils/ai.agent.js";
import { getVectorStore } from "./vector.service.js";

export const generateAiReply = async (question) => {
  if (!question) {
    throw new Error("Question is required");
  }

  const vectorStore = await getVectorStore();
  console.log(`here is the vectore store data from vector db after storing the document`);
  console.log(vectorStore);
  const retriver = vectorStore.asRetriever();
  console.log("data after retriving from vectore store");
  console.log(retriver);
  const docResult = await retriver._getRelevantDocuments(question);
  console.log(`Here we got our similar data output based on the our search and is that exact ? check here ${docResult.toString()}`);

  const context = docResult.map(doc => doc.pageContent).join("\n");

  const response = await agent.invoke(`
    You are an Dipanshu Kale personal AI assistant.
    Answer ONLY using the provided context.
    If answer not found, say you don't know.

    Context:
    ${context}

    Question:
    ${question}
  `);

  return response.content;
};