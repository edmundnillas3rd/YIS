import { Router } from "express";
const router = Router();

import {
    index,
    claimSolicitation,
    getUserSolicitation,
    returnSolicitation,
    submitSolicitation,
    solicitationUpdate
} from "../controllers/solicitationForms";

// GET
router.get("/", index);
router.get("/return-solicitation", returnSolicitation);
router.get("/:id", getUserSolicitation);

// POST
router.post("/submit-solicitation", submitSolicitation);
router.post("/solicitation-claim", claimSolicitation);

// PUT
router.put("/solicitation-update", solicitationUpdate);

export default router;
