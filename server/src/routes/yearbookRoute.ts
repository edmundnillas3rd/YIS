import { Router } from "express";
import { index, statusYearbookUpdate, yearbookReleased, statusYearbookPhotosUpdate, searchStudentYearbookPhoto } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);

// POST
router.post("/search-yearbook-photo", searchStudentYearbookPhoto);
router.post("/yearbook-released", yearbookReleased);

// PUT
router.put("/:status/:userID/status-update", statusYearbookPhotosUpdate);
router.put("/:status/:userID/status-update-yearbook", statusYearbookUpdate);

export default router;