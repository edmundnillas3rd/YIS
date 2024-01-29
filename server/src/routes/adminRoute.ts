import { Router } from "express";
import { downloadSolicitation, downloadStudentInfo, downloadYearbookPhotos, downloadYearbookReleased, updateGraduatingYear } from "../controllers/admin";
const router = Router();

export default router;

router.get("/download-solicitation", downloadSolicitation);
router.get("/download-graduating-students");
router.get("/download-yearbook-released", downloadYearbookReleased);
router.get("/download-yearbook-photos", downloadYearbookPhotos);
router.get("/download-student-info", downloadStudentInfo);


router.put("/update-graduating-year", updateGraduatingYear);