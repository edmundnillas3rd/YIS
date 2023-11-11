import { Router } from "express";
const router = Router();

import { index, returnSolicitation, submitSolicitation } from "../controllers/solicitationForms";

// GET
router.get("/", index);
router.get("/return-solicitation", returnSolicitation);

// POST
router.post("/:id/submit-solicitation", submitSolicitation);

export default router;
