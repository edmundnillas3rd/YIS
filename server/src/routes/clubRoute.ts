import { Router } from "express";
const router = Router();

import { index, userClub, clubUserAdd, clubUserPositionAdd, userClubInfo, userClubAward } from "../controllers/club";

router.get("/", index);
router.get("/user-club", userClub);
router.get("/:clubID/user-club-info", userClubInfo);
router.get("/user-club-award", userClubAward);

// POST
router.post("/club-add", clubUserAdd);
router.post("/position-add", clubUserPositionAdd);
export default router;
