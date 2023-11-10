import { Router } from "express";
const router = Router();

import { index } from "../controllers/club";

router.get("/", index);

export default router;
