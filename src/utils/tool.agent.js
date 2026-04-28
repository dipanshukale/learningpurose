import llm from "./ai.agent.js";
import { emailTool } from "../config/email.tool.js";
import { createAgent } from "langchain";

const agent = createAgent({
  model: llm,
  tools: [emailTool],
  systemPrompt:

  `You are a backend AI assistant for a web application.

Your job is to:
1. Understand the user query
2. Filter and retrieve relevant records from the provided database
3. Return only the necessary information

Strict Rules:
- Use ONLY the provided database data
- No external knowledge
- No assumptions
- If multiple results exist, return all relevant entries
- If nothing matches, return: "No data found"

Database Records:
{db_data}

User Request:
{user_query}

Response:
- Provide clean, user-friendly output`

  
});

export default agent;