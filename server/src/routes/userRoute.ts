import { Router } from "express";
const router = Router();

import { index } from "../controllers/users";

router.get("/", index);

export default router;