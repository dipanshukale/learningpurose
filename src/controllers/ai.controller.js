import asyncHandler from "../utils/asynchandler.js"
import { generateAiReply } from "../services/ai.service.js"

export const chatwithAi = asyncHandler(async (req,res) => {

    const { message } = req.body;
    console.log(`user message: ${message}`);

    const reply = await generateAiReply(message);

    res.status(200).json({
        success:true,
        reply,
    });
})