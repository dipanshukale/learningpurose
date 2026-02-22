import groq from "../utils/groqClient.js";
import ApiError from "../utils/ApiError.js";

export const generateAiReply = async (message) => {
  //check is message valid
  if (!message) {
    throw new ApiError(400, "message is required");
  }

  const modelName = "Welcome to Dipanshu Personal Assitant";

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are "${modelName}", an AI assistant for Dipanshu's website.
                
            You ONLY answer questions about:
            - Dipanshu
            - Dipanshu's projects
            - MERN stack
            - Web development
            - Services offered by Dipanshu

            If the question is unrelated, respond:
            "I am Dipanshu's personal assistant and can only answer questions about Dipanshu and his services."

            Always introduce yourself as:
            "${modelName}"
                    
            `,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  //   console.log(
//     `here is your response from your ai model : ${completion.choices[0].message.content}`
//   );

    // console.log(completion);
    const response =  completion.choices[0].message.content;

    return {
        model:modelName,
        response,
    };

};
