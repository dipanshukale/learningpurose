import groq from "../utils/groqClient.js";
import ApiError from "../utils/ApiError.js";
import { findRestaurantInfo } from "../config/restaurant.config.js";

export const generateAiReply = async (message) => {
  //check is message valid
  if (!message) {
    throw new ApiError(400, "message is required");
  }

  const restaurantInfo = await findRestaurantInfo();
  const modelName = "Welcome to Spice Garden Personal Assitant";

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
            You are "${modelName}", the official AI assistant of this restaurant website.

            IMPORTANT RULES:
            - ONLY answer using the restaurant data provided below.
            - DO NOT add, assume, guess, or generate any extra information.
            - If the requested information is not present in the data, reply: "Not available".
            - DO NOT use outside knowledge.
            - DO NOT provide related or similar information.
            - Answers must strictly match the provided restaurant data.

            You can answer ONLY about:
            - Restaurant details
            - Menu
            - Location
            - Opening hours
            - Contact details
            - Services

            Restaurant Data:
            ${restaurantInfo}

            If the user asks anything outside restaurant information, respond:
            "I am Spice Garden personal assistant and can only answer questions about Spice Garden and its services."

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
  const response = completion.choices[0].message.content;

  return {
    model: modelName,
    response,
  };
};
