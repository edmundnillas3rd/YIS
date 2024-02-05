import { Router } from "express";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

import { index, statusYearbookUpdate, yearbookReleased, statusYearbookPhotosUpdate, searchStudentYearbookPhoto, searchStudentYearbook, downloadYearbook, downloadData, yearbookPhotosUpload, addYearbookPhoto, addYearbook, deleteYearbook, deleteYearbookPhotos } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);
router.get("/:department_id/download-yearbook-info", downloadYearbook);
router.get("/download-unpaid-unclaimed-sheet", downloadData);

// POST
router.post("/add-yearbook", addYearbook);
router.post("/add-yearbook-photo", addYearbookPhoto);
router.post("/search-yearbook-photo", searchStudentYearbookPhoto);
router.post("/search-yearbook", searchStudentYearbook);
router.post("/yearbook-released", yearbookReleased);
router.post("/upload-yearbook-photos", upload.single("yearbook-photos-sheet"), yearbookPhotosUpload);

// PUT
router.put("/status-update-photos", statusYearbookPhotosUpdate);
router.put("/status-update-yearbook", statusYearbookUpdate);

router.delete("/:yearbookID/delete-yearbook", deleteYearbook);
router.delete("/:id/delete-yearbook-photos", deleteYearbookPhotos);

export default router;