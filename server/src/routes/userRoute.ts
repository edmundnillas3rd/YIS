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
    getStudentUnreturned
} from "../controllers/users";

// GET
router.get("/", index);
router.get("/student-unreturned", getStudentUnreturned);
router.get("/user-current", getCurrentLogUser);

// POST
router.post("/info-submit", submitInfo);
router.post("/user-signup", signupUserStudent);
router.post("/user-login", loginUserStudent);
router.post("/logout", logoutUser);
router.post("/student-search", searchStudent);
router.post("/student-search-recipient", searchStudentRecipient);
router.post("/student-search-paid", searchStudentPaid);
router.post("/student-search-unreturned", searchStudentUnreturned);

export default router;