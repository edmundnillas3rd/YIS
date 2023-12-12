import { Router } from "express";
import { index, releaseYearbook, statusUpdate, searchStudentYearbookPhoto } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);

// POST
router.post("/search-yearbook-photo", searchStudentYearbookPhoto);

// PUT
router.put("/:status/:userID/status-update", statusUpdate);
router.put("/release-yearbook", releaseYearbook);

export default router;