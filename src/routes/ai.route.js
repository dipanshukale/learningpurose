import { Router } from "express";
import { chatwithAi } from "../controllers/ai.controller.js";

const router = Router();

router.post("/ask",chatwithAi);


export default router;