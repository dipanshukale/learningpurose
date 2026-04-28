import llm from "./ai.agent.js";
import { emailTool } from "../config/email.tool.js";
import { createAgent } from "langchain";

const agent = createAgent({
  model: llm,
  tools: [emailTool],
  systemPrompt:

  `You are a helpful assistant.

  STRICT RULES FOR EMAIL TOOL:
  - ONLY use the send_email tool when the user EXPLICITLY says one of these:
    ✅ "send an email"
    ✅ "send a mail"
    ✅ "email someone"
    ✅ "sent mail"
    ✅ "send message to [email address]"
  
  - NEVER use the send_email tool for:
    ❌ General questions ("what is...", "how does...", "tell me...")
    ❌ Greetings ("hello", "hi", "how are you")
    ❌ Weather, news, or any other queries
    ❌ Unless the user clearly asks to send an email
  
  - If the user asks something unrelated to email, just answer normally.
  - Always confirm with the user BEFORE sending an email:
    "You want me to send an email to [to] with subject [subject]. Shall I proceed? (yes/no)"
  - Only send the email after the user confirms with "yes".`

  
});

export default agent;