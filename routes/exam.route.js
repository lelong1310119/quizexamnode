import express from "express";
import { examController } from "../controllers/exam.controller.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/exams", auth , examController.createExam);
router.get("/exams/:id", auth , examController.getById);
router.get("/exams/get_by_user", auth , examController.getList);
router.get("/exams/get_all", auth , examController.getListActive);
router.patch("/exams", auth , examController.updateExam);
router.delete("/exams/:id", auth , examController.deleteExam);

export default router;
