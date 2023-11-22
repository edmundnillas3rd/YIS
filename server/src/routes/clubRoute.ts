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
    clubUserPositionUpdate,
    clubUserRemove,
    awardUserRemove
} from "../controllers/club";

// GET
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

// DELETE
router.delete("/:id/user-organization-remove", clubUserRemove);
router.delete("/:id/user-award-remove", awardUserRemove);

export default router;
