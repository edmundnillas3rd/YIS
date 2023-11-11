import { Router } from "express";
const router = Router();

import { index, userClub } from "../controllers/club";

router.get("/", index);
router.get("/:id", userClub)

export default router;
