import agent from "../utils/tool.agent.js";
import { getVectorStore } from "./vector.service.js";

export const generateAiReply = async (question) => {

  const vectorStore = await getVectorStore();
  console.log("vectorStore data is here ---------->>>>>>", vectorStore);
  const retriever = vectorStore.asRetriever();
  console.log("retriever data is here ---------->>>>>>", retriever);
  
  const docs = await retriever.invoke(question);
  console.log("docs data is here ---------->>>>>>", docs);
  const context = docs.map(d => d.pageContent).join("\n");
  console.log("context data is here ---------->>>>>>", context);

  const result = await agent.invoke({
    messages: [
      { role: "system", content: `Context:\n${context}` },
      { role: "user", content: question }
    ]
  });

  const output = JSON.parse(result.messages.at(-1).content);
  console.log("output data is here ---------->>>>>>", output);

  return output.response;
};