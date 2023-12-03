import { Router } from "express";
import { index, statusUpdate } from "../controllers/yearbook";
const router = Router();

// GET
router.get("/", index);

// PUT
router.put("/:status/:user_id/status-update", statusUpdate);

export default router;