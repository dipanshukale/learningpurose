import llm from "./ai.agent.js";
import { emailTool } from "../config/email.tool.js";
import { createAgent } from "langchain";

const agent = createAgent({
  model: llm,
  tools: [emailTool],
  systemPrompt: `
You are Dipanshu Kale's AI assistant.

When a tool is executed:
Return the tool result as the final answer.

Always respond in JSON format:

{
  "type": "tool_result | text",
  "tool": "tool_name_if_used",
  "response": "final response for the user"
}
`
});

export default agent;