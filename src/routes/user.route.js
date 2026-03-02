import { Router } from "express";
import * as userCtrl from "../controllers/user.controller.js";

const router  = Router();

router.post("/register",userCtrl.createUserRegister);
router.post("/login",userCtrl.createUserLogin);

export default router;