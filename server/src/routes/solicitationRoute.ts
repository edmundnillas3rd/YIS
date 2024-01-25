import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

import {
    index,
    claimSolicitation,
    getUserSolicitation,
    returnSolicitation,
    searchSolicitationForm,
    submitSolicitation,
    solicitationUpdate,
    uploadData,
    downloadExcelSheet
} from "../controllers/solicitationForms";

// GET
router.get("/", index);
router.get("/return-solicitation", returnSolicitation);
// router.get("/:id", getUserSolicitation);
router.get("/download-sheet", downloadExcelSheet)

// POST
router.post("/search-solicitation-form", searchSolicitationForm);
router.post("/submit-solicitation", submitSolicitation);
router.post("/solicitation-claim", claimSolicitation);
router.post("/upload-solicitation-file", upload.single("solicitation-sheet"), uploadData);

// PUT
router.put("/solicitation-update", solicitationUpdate);

export default router;
