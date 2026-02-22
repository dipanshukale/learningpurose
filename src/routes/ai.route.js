import { Router } from "express";
import { chatwithAi } from "../controllers/ai.controller.js";
import { getLastData } from "../controllers/viewData.controller.js";

const router = Router();

router.get("/response", getLastData);
router.post("/ask",chatwithAi);



export default router;