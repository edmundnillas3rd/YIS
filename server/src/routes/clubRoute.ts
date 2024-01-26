import { Router } from "express";
const router = Router();

import {
    index,
    userClub,
    userAward,
    userSeminar,
    userClubInfo,
    clubUserAdd,
    userPreview,
    clubUserPositionAdd,
    awardUserAdd,
    seminarUserAdd,
    clubUserPositionUpdate,
    clubUserAwardUpdate,
    clubUserSeminarUpdate,
    clubUserRemove,
    awardUserRemove,
    seminarUserRemove,
    newClubAdd,
    clubUpdateInfo,
    clubDeleteInfo
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
router.post("/add-new-club", newClubAdd);

// PUT
router.put("/position-update", clubUserPositionUpdate);
router.put("/:id/award-update", clubUserAwardUpdate);
router.put("/:id/seminar-update", clubUserSeminarUpdate)
router.put("/update-club-info", clubUpdateInfo);

// DELETE
router.delete("/:id/user-organization-remove", clubUserRemove);
router.delete("/:id/user-award-remove", awardUserRemove);
router.delete("/:id/user-seminar-remove", seminarUserRemove);
router.delete("/:id/delete-club", clubDeleteInfo)

export default router;
