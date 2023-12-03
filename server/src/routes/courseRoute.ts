import { Router } from "express";
import { index } from "../controllers/course";
const router = Router();

router.get("/", index);

export default router;