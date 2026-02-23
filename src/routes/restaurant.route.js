import { Router } from "express";
import * as restaurantCtrl from "../controllers/restaurantData.controller.js";

const router = Router();

router.post("/add/details", restaurantCtrl.createRestaurant);

export default router;