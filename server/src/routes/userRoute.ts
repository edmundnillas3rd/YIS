import { Router } from "express";
const router = Router();

import { index, signupUserStudent, submitInfo } from "../controllers/users";

router.get("/", index);

// POST
router.post("/info-submit", submitInfo);
router.post("/user-signup", signupUserStudent);

export default router;