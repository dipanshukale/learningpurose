import { Router } from "express";
import aiRoute from "./ai.route.js"

const router = Router();

router.use("/ai",aiRoute);


export default router;