import { Router } from "express";
const router = Router();

import { index, returnSolicitation } from "../controllers/solicitationForms";

router.get("/", index);
router.get("/return-solicitation", returnSolicitation);

export default router;
