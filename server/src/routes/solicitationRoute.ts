import { Router } from "express";
const router = Router();

import {
    index,
    claimSolicitation,
    getUserSolicitation,
    returnSolicitation,
    submitSolicitation
} from "../controllers/solicitationForms";

// GET
router.get("/", index);
router.get("/return-solicitation", returnSolicitation);
router.get("/:id", getUserSolicitation);

// POST
router.post("/submit-solicitation", submitSolicitation);
router.post("/solicitation-claim", claimSolicitation);

export default router;
