import { Router } from "express";
const router = Router();

import { getUserSolicitation, index, returnSolicitation, submitSolicitation } from "../controllers/solicitationForms";

// GET
router.get("/", index);
router.get("/return-solicitation", returnSolicitation);
router.get("/:id", getUserSolicitation);

// POST
router.post("/:id/submit-solicitation", submitSolicitation);

export default router;
