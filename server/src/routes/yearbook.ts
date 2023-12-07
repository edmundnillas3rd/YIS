import { Router } from "express";
import { index, releaseYearbook, statusUpdate } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);

// PUT
router.put("/:status/:user_id/status-update", statusUpdate);
router.put("/release-yearbook", releaseYearbook);

export default router;