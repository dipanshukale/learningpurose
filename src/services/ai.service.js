import agent from "../utils/tool.agent.js";
import { getVectorStore } from "./vector.service.js";

export const generateAiReply = async (question) => {

  const vectorStore = await getVectorStore();
  const retriever = vectorStore.asRetriever();

  const docs = await retriever.invoke(question);
  const context = docs.map(d => d.pageContent).join("\n");

  const result = await agent.invoke({
    messages: [
      { role: "system", content: `Context:\n${context}` },
      { role: "user", content: question }
    ]
  });

  const output = JSON.parse(result.messages.at(-1).content);

  return output.response;
};