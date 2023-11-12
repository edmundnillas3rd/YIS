import { Router } from "express";
const router = Router();

import { index, loginUserStudent, signupUserStudent, submitInfo } from "../controllers/users";

router.get("/", index);

// POST
router.post("/info-submit", submitInfo);
router.post("/user-signup", signupUserStudent);
router.post("/user-login", loginUserStudent);

export default router;