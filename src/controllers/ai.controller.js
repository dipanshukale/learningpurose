import asyncHandler from "../utils/asynchandler.js";
import { generateAiReply } from "../services/ai.service.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import { globlStore } from "../utils/globalData.js";

export const chatwithAi = asyncHandler(async (req,res) => {

    const { question } = req.body;
    console.log(`user message: ${question}`);

    const reply = await generateAiReply(question);

    console.log(`ai reply: ${reply}`);

    globlStore.lastData = reply;

    res.status(200).json(new ApiResponse(200,reply,"response generated"));
});