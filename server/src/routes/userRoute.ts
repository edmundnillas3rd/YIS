import { Router } from "express";
const router = Router();

import { index, submitInfo } from "../controllers/users";

router.get("/", index);

// POST
router.post("/info-submit", submitInfo);

export default router;