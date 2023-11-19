import { Router } from "express";
const router = Router();

import { index, loginUserStudent, signupUserStudent, submitInfo, logoutUser, getCurrentLogUser, searchStudent } from "../controllers/users";

// GET
router.get("/", index);
router.get("/user-current", getCurrentLogUser);

// POST
router.post("/info-submit", submitInfo);
router.post("/user-signup", signupUserStudent);
router.post("/user-login", loginUserStudent);
router.post("/logout", logoutUser);
router.post("/student-search", searchStudent);

export default router;