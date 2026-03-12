import { Router } from "express";
import aiRoute from "./ai.route.js"
import restaurantRoute from "./restaurant.route.js"
import userRoute from "./user.route.js";

const router = Router();

router.use("/ai",aiRoute);
router.use("/restaurant",restaurantRoute);
router.use("/user",userRoute);

export default router;