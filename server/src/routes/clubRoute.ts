import { Router } from "express";
const router = Router();

import { index, userClub, clubUserAdd } from "../controllers/club";

router.get("/", index);
router.get("/user-club", userClub)

// POST
router.post("/club-add", clubUserAdd);
export default router;
