import { Router } from "express";
const router = Router();

import {
    index,
    userClub,
    clubUserAdd,
    clubUserPositionAdd,
    userClubInfo,
    userPreview,
    awardUserAdd,
    userAward,
    clubUserPositionUpdate,
    clubUserAwardUpdate,
    clubUserRemove,
    awardUserRemove,
    userSeminar,
    seminarUserAdd
} from "../controllers/club";

// GET
router.get("/", index);
router.get("/user-club", userClub);
router.get("/user-award", userAward);
router.get("/user-seminar", userSeminar);
router.get("/:clubID/user-club-info", userClubInfo);
router.get("/user-preview", userPreview);

// POST
router.post("/club-add", clubUserAdd);
router.post("/position-add", clubUserPositionAdd);
router.post("/award-add", awardUserAdd);
router.post("/seminar-add", seminarUserAdd);

// PUT
router.put("/position-update", clubUserPositionUpdate);
router.put("/:id/award-update", clubUserAwardUpdate);

// DELETE
router.delete("/:id/user-organization-remove", clubUserRemove);
router.delete("/:id/user-award-remove", awardUserRemove);

export default router;
