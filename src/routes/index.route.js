import { Router } from "express";
import aiRoute from "./ai.route.js"
import restaurantRoute from "./restaurant.route.js"

const router = Router();

router.use("/ai",aiRoute);
router.use("/restaurant",restaurantRoute);


export default router;