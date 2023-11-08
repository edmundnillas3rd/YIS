import { Router } from "express";
const router = Router();

import { index } from "../controllers/solicitation_forms";

router.get("/", index);

export default router;
