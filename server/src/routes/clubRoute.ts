import { Router } from "express";
const router = Router();

import { 
    index, 
    userClub, 
    clubUserAdd, 
    clubUserPositionAdd, 
    userClubInfo, 
    userClubAward, 
    awardUserAdd, 
    userAward,
    clubUserPositionUpdate
} from "../controllers/club";

router.get("/", index);
router.get("/user-club", userClub);
router.get("/:clubID/user-club-info", userClubInfo);
router.get("/user-club-award", userClubAward);
router.get("/user-award", userAward);

// POST
router.post("/club-add", clubUserAdd);
router.post("/position-add", clubUserPositionAdd);
router.post("/award-add", awardUserAdd);

// PUT
router.put("/position-update", clubUserPositionUpdate);

export default router;
