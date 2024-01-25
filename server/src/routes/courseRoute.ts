import { Router } from "express";
import { addCourse, addDepartment, deleteCourse, deleteDepartment, index, updateCourse, updateDepartment } from "../controllers/course";
const router = Router();

router.get("/", index);

// COURSE
router.post("/add-course", addCourse)
router.put("/update-course", updateCourse);
router.delete("/:id/delete-course", deleteCourse);

// DEPARTMENT
router.post("/add-department", addDepartment)
router.put("/update-department", updateDepartment);
router.delete("/:id/delete-department", deleteDepartment);

export default router;