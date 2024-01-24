import { Router } from "express";
import { index, statusYearbookUpdate, yearbookReleased, statusYearbookPhotosUpdate, searchStudentYearbookPhoto, searchStudentYearbook } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);

// POST
router.post("/search-yearbook-photo", searchStudentYearbookPhoto);
router.post("/search-yearbook", searchStudentYearbook);
router.post("/yearbook-released", yearbookReleased);

// PUT
router.put("/status-update-photos", statusYearbookPhotosUpdate);
router.put("/status-update-yearbook", statusYearbookUpdate);

export default router;