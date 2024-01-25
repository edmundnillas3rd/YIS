import { Router } from "express";
import { addDepartment, deleteDepartment, index, updateDepartment } from "../controllers/course";
const router = Router();

router.get("/", index);

// DEPARTMENT
router.post("/add-department", addDepartment)
router.put("/update-department", updateDepartment);
router.delete("/:id/delete-department", deleteDepartment);

export default router;