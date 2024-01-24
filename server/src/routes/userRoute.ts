import { Router } from "express";
const router = Router();

import {
    index,
    loginUserStudent,
    signupUserStudent,
    submitInfo,
    logoutUser,
    getCurrentLogUser,
    searchStudent,
    searchStudentPaid,
    searchStudentUnreturned,
    searchStudentRecipient,
    getStudentUnreturned,
    updateUsername,
    signupAdmin,
    updateStudentInfo,
    deleteStudent,
    signupCoAdmin,
    deleteCoAdmin,
    updateCoAdminInfo
} from "../controllers/users";

// GET
router.get("/", index);
router.get("/student-unreturned", getStudentUnreturned);
router.get("/user-current", getCurrentLogUser);

// STUDENT POST
router.post("/info-submit", submitInfo);
router.post("/user-signup", signupUserStudent);
router.post("/user-login", loginUserStudent);
router.post("/logout", logoutUser);
router.post("/student-search", searchStudent);
router.post("/student-search-recipient", searchStudentRecipient);
router.post("/student-search-paid", searchStudentPaid);
router.post("/student-search-unreturned", searchStudentUnreturned);

// CO-ADMIN POST
router.post("/coadmin-signup", signupCoAdmin);

// ADMIN POST
router.post("/admin-signup", signupAdmin);

// PUT
router.put("/update-name", updateUsername);
router.put("/update-student-info", updateStudentInfo);
router.put("/update-coadmin-info", updateCoAdminInfo);

// DELETE
router.delete("/:id/delete-student", deleteStudent);
router.delete("/:id/delete-coadmin", deleteCoAdmin);

export default router;
